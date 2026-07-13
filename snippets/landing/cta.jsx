// AgentMail landing — "One API. Five Surfaces." Surface tiles wired to a
// central AgentMail box with Figma-style selection handles. 988x420 stage
// scaled by container width; static 2x2 grid on small screens.
// All constants live INSIDE the component body (Mintlify snippet rule).

export const LandingCta = () => {
  const TILES = [
    { label: "MCP", caption: "Claude Code · Cursor", x: 96, y: 40 },
    { label: "SDK", caption: "Python · TypeScript", x: 736, y: 52 },
    { label: "CLI", caption: "terminal & scripts", x: 82, y: 268 },
    { label: "Console", caption: "see what your code did", x: 716, y: 258 },
  ];
  const EDGES = [
    "M 250 85 C 320 110 340 160 399 185",
    "M 736 95 C 670 120 650 165 589 185",
    "M 245 300 C 320 280 345 240 399 225",
    "M 716 295 C 660 272 645 238 589 225",
  ];

  return (
    <section className="aml-section aml-cta">
      <div className="aml-secthead">
        <div className="aml-secthead-left">
          <div className="aml-kicker">FIVE SURFACES</div>
          <h2 className="aml-h2">
            <span className="ln">One API.</span>
            <span className="ln aml-grad">Five Surfaces.</span>
          </h2>
        </div>
        <div className="aml-secthead-right">
          <p className="aml-secthead-copy">
            CLI for the terminal, MCP for your coding agent, Console to see
            what your code did, SDKs for your app. And raw HTTP when you want
            no dependency at all.
          </p>
          <a className="aml-btn aml-btn--primary" href="/quickstart">
            <span>Quickstart</span>
            <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div className="cta-wrap" aria-hidden="true">
        <div className="cta-stage">
          <div className="cta-glow" />
          <svg className="cta-conn" viewBox="0 0 988 420" fill="none">
            {EDGES.map((d, i) => (
              <path key={i} className="cta-dash" d={d} />
            ))}
          </svg>

          <div className="cta-box">
            <i className="h tl" /><i className="h tr" /><i className="h bl" /><i className="h br" />
            <div className="cta-box-label">AgentMail</div>
            <div className="cta-box-sub">raw HTTP underneath</div>
          </div>

          <div className="cta-tiles">
            {TILES.map((t) => (
              <div key={t.label} className="cta-tile" style={{ left: t.x, top: t.y }}>
                <div className="cta-tile-label">{t.label}</div>
                <div className="cta-tile-caption">{t.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .aml-cta {
          padding-top: var(--aml-section-y);
          padding-bottom: 60px;
          display: flex;
          flex-direction: column;
          gap: 36px;
        }
        .cta-wrap {
          container-type: inline-size;
          width: 100%;
          aspect-ratio: 988 / 420;
        }
        .cta-stage {
          position: relative;
          width: 988px;
          height: 420px;
          transform-origin: top left;
          transform: scale(calc(100cqw / 988));
        }
        .cta-glow {
          position: absolute; left: 330px; top: 40px;
          width: 330px; height: 330px; border-radius: 50%;
          background: radial-gradient(circle, var(--aml-glow) 0%, transparent 70%);
        }
        .cta-conn { position: absolute; inset: 0; width: 100%; height: 100%; }
        .cta-dash {
          stroke: var(--aml-conn);
          stroke-width: 1.2;
          stroke-dasharray: 5 5;
        }
        .cta-box {
          position: absolute; left: 399px; top: 155px;
          width: 190px; height: 100px;
          border: 1.5px dashed var(--aml-acc);
          border-radius: 12px;
          background: var(--aml-tint);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 4px;
        }
        .cta-box .h {
          position: absolute;
          width: 11px; height: 11px; border-radius: 2px;
          background: var(--aml-card);
          border: 1.5px solid var(--aml-acc);
        }
        .cta-box .tl { left: -6px; top: -6px; }
        .cta-box .tr { right: -6px; top: -6px; }
        .cta-box .bl { left: -6px; bottom: -6px; }
        .cta-box .br { right: -6px; bottom: -6px; }
        .cta-box-label {
          font-family: var(--aml-sans); font-weight: 700;
          font-size: 21px; letter-spacing: -0.02em; color: var(--aml-ink);
        }
        .cta-box-sub {
          font-family: var(--aml-mono); font-size: 10.5px; color: var(--aml-muted);
        }
        .cta-tiles { display: contents; }
        .cta-tile {
          position: absolute;
          display: flex; flex-direction: column; gap: 4px; align-items: center;
          padding: 16px 20px;
          border-radius: 16px;
          background: var(--aml-card);
          border: 1px solid var(--aml-card-bd);
          box-shadow: var(--aml-shadow);
        }
        .cta-tile-label {
          font-family: var(--aml-sans); font-weight: 700;
          font-size: 18px; letter-spacing: -0.02em; color: var(--aml-ink);
        }
        .cta-tile-caption {
          font-family: var(--aml-mono); font-size: 10.5px; color: var(--aml-muted);
          white-space: nowrap;
        }
        @media (prefers-reduced-motion: no-preference) {
          .cta-dash { animation: cta-march 1.6s linear infinite; }
          @keyframes cta-march { to { stroke-dashoffset: -20; } }
        }
        @media (max-width: 768px) {
          .cta-wrap { aspect-ratio: auto; }
          .cta-stage {
            width: 100%; height: auto; transform: none;
            display: flex; flex-direction: column; gap: 14px;
          }
          .cta-conn, .cta-glow, .cta-box .h { display: none; }
          .cta-box { position: static; width: auto; height: auto; padding: 22px 16px; order: -1; }
          .cta-tiles {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
          .cta-tile { position: static; }
        }
      `}</style>
    </section>
  );
};
