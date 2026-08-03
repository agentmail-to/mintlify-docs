// Renders the simplified diagram specs in this directory to light + dark SVGs
// one level up, via headless Chromium + @excalidraw/utils (browser build).
// The dark variant matches the existing architecture diagram: same SVG with a
// root-level invert/hue-rotate filter.
//
// Deps are borrowed from the opencomputer-posts render setup:
//   node render.mjs [path-to-node_modules-with-playwright-and-excalidraw-utils]
import { createRequire } from "module";
import { readFileSync, readdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "..");
const DEPS = process.argv[2] || join(HERE, "node_modules");

const require = createRequire(join(DEPS, "x.js"));
const { chromium } = require("playwright");

const utilsBundle = readFileSync(
  join(DEPS, "@excalidraw/utils/dist/prod/index.js"),
  "utf8"
);

let seed = 1000;
const base = (el) => ({
  angle: 0,
  fillStyle: "solid",
  strokeStyle: "solid",
  roughness: 1,
  opacity: 100,
  groupIds: [],
  frameId: null,
  seed: seed++,
  version: 1,
  versionNonce: seed++,
  isDeleted: false,
  boundElements: null,
  updated: 1,
  link: null,
  locked: false,
  ...el,
});

// Approximate Excalifont advance width so centered text lands visually centered.
const textWidth = (text, fontSize) =>
  Math.max(...text.split("\n").map((l) => l.length)) * fontSize * 0.52;

const expand = (spec) =>
  spec.elements.map((e) => {
    if (e.kind === "rect")
      return base({
        id: e.id,
        type: "rectangle",
        x: e.x,
        y: e.y,
        width: e.width,
        height: e.height,
        strokeColor: e.strokeColor,
        backgroundColor: e.backgroundColor,
        strokeWidth: e.strokeWidth ?? 2,
        roundness: { type: 3 },
      });
    if (e.kind === "text") {
      const lines = e.text.split("\n");
      const width = textWidth(e.text, e.fontSize);
      const height = lines.length * e.fontSize * 1.25;
      return base({
        id: e.id,
        type: "text",
        x: (e.centerX ?? e.x + width / 2) - width / 2,
        y: e.y,
        width,
        height,
        strokeColor: e.strokeColor,
        backgroundColor: "transparent",
        strokeWidth: 1,
        roundness: null,
        text: e.text,
        originalText: e.text,
        fontSize: e.fontSize,
        fontFamily: 5,
        textAlign: "center",
        verticalAlign: "top",
        containerId: null,
        lineHeight: 1.25,
        baseline: e.fontSize,
        autoResize: true,
      });
    }
    if (e.kind === "arrow") {
      const xs = e.points.map((p) => p[0]);
      const ys = e.points.map((p) => p[1]);
      return base({
        id: e.id,
        type: "arrow",
        x: e.x,
        y: e.y,
        width: Math.max(...xs) - Math.min(...xs),
        height: Math.max(...ys) - Math.min(...ys),
        strokeColor: e.strokeColor,
        backgroundColor: "transparent",
        strokeWidth: e.strokeWidth ?? 2,
        roundness: { type: 2 },
        points: e.points,
        lastCommittedPoint: null,
        startBinding: null,
        endBinding: null,
        startArrowhead: null,
        endArrowhead: "arrow",
        elbowed: false,
      });
    }
    throw new Error(`unknown kind: ${e.kind}`);
  });

const html = `<!doctype html><html><head><meta charset="utf-8"></head><body>
<script type="module">
  import { exportToSvg } from "/excalidraw-utils.js";
  window.renderScene = async (elements) => {
    const svg = await exportToSvg({
      elements,
      appState: { exportBackground: false, exportWithDarkMode: false, exportEmbedScene: true },
      files: {},
      exportPadding: 24,
    });
    return svg.outerHTML;
  };
  window.ready = true;
</script></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
page.on("pageerror", (e) => console.error("pageerror:", e.message));
await page.route("**/excalidraw-utils.js", (route) =>
  route.fulfill({ contentType: "text/javascript", body: utilsBundle })
);
await page.route("http://localhost/", (route) =>
  route.fulfill({ contentType: "text/html", body: html })
);
await page.goto("http://localhost/");
await page.waitForFunction("window.ready === true", { timeout: 60000 });

for (const f of readdirSync(HERE).filter((f) => f.endsWith(".excalidraw.json"))) {
  const spec = JSON.parse(readFileSync(join(HERE, f), "utf8"));
  const elements = expand(spec);
  const svg = await page.evaluate((els) => window.renderScene(els), elements);
  const name = f.replace(".excalidraw.json", "");
  writeFileSync(join(OUT, `${name}.svg`), svg);
  const dark = svg.replace(
    /^<svg /,
    '<svg filter="invert(93%) hue-rotate(180deg)" '
  );
  writeFileSync(join(OUT, `${name}.dark.svg`), dark);
  console.log("rendered", name, "+ dark");
}
await browser.close();
