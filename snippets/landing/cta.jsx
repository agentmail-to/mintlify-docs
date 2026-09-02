// AgentMail landing — integrations wall. Every integration page in the docs
// as a logo + name tile. Tiles whose logo is "am" render the AgentMail
// wordmark (theme-aware pair). All constants live INSIDE the component body
// (Mintlify snippet rule).

export const LandingCta = () => {
  const WALL = [
    // AgentMail's own surfaces
    { name: "TypeScript SDK", href: "/integrations/sdks-and-cli", logo: "am" },
    { name: "Python SDK", href: "/integrations/sdks-and-cli", logo: "am" },
    { name: "CLI", href: "/integrations/sdks-and-cli", logo: "am" },
    { name: "MCP", href: "/integrations/mcp-and-skills", logo: "am" },
    { name: "Skills", href: "/integrations/mcp-and-skills", logo: "am" },
    // the household names
    { name: "Claude Cowork", href: "/integrations/frameworks/claude-cowork", logo: "/images/logos/claude.svg" },
    { name: "OpenAI Agents SDK", href: "/integrations/frameworks/openai-agents-sdk", logo: "/images/logos/openai.svg" },
    { name: "OpenAI Codex", href: "/integrations/frameworks/codex", logo: "/images/logos/openai.svg" },
    { name: "OpenClaw", href: "/integrations/frameworks/openclaw", logo: "/images/logos/openclaw.svg" },
    { name: "Grok Bot", href: "/integrations/frameworks/grokbot", logo: "/images/logos/grok.svg" },
    { name: "Cursor", href: "/integrations/frameworks/cursor", logo: "/images/logos/cursor.svg" },
    { name: "Devin", href: "/integrations/frameworks/devin", logo: "/images/logos/devin.svg" },
    { name: "Hermes", href: "/integrations/frameworks/hermes", logo: "/images/logos/hermes.png" },
    // frameworks and platforms
    { name: "LangChain", href: "/integrations/frameworks/langchain", logo: "/images/logos/langchain.svg" },
    { name: "Vercel AI SDK", href: "/integrations/frameworks/ai-sdk", logo: "/images/logos/vercel.svg" },
    { name: "Google ADK", href: "/integrations/frameworks/google-adk", logo: "/images/logos/google.svg" },
    { name: "Mastra", href: "/integrations/frameworks/mastra", logo: "/images/logos/mastra.svg" },
    { name: "eve", href: "/integrations/frameworks/eve", logo: "/images/logos/vercel.svg" },
    { name: "LiveKit Agents", href: "/integrations/frameworks/livekit", logo: "/images/logos/livekit.svg" },
    { name: "Sim", href: "/integrations/frameworks/sim", logo: "/images/logos/sim.png" },
    { name: "Replit", href: "/integrations/frameworks/replit", logo: "/images/logos/replit.svg" },
    // provisioning and pay-per-use
    { name: "Vercel Marketplace", href: "/integrations/marketplaces#install-from-vercel-marketplace", logo: "/images/logos/vercel.svg" },
    { name: "Stripe Projects", href: "/integrations/marketplaces#provision-through-stripe-projects", logo: "am" },
    { name: "x402", href: "/integrations/pay-per-use/x402", logo: "am" },
    { name: "MPP", href: "/integrations/pay-per-use/mpp", logo: "/images/logos/mpp.svg" },
  ];

  return (
    <section className="aml-section aml-cta">
      <div className="aml-secthead">
        <div className="aml-secthead-left">
          <div className="aml-kicker">INTEGRATIONS</div>
          <h2 className="aml-h2">
            <span className="ln">One API.</span>
            <span className="ln aml-grad">Every Agent Stack.</span>
          </h2>
        </div>
        <div className="aml-secthead-right">
          <p className="aml-secthead-copy">
            Native integrations for the frameworks and platforms your agents
            already run on — plus SDKs, MCP, a CLI, and pay-per-use. Raw HTTP
            underneath.
          </p>
          <a className="aml-btn aml-btn--primary" href="/quickstart">
            <span>Quickstart</span>
            <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div className="cta-wall">
        {WALL.map((t) => (
          <a key={t.href + t.name} className="cta-tile" href={t.href}>
            {t.logo === "am" ? (
              <span className="cta-tile-logo cta-tile-logo--am">
                <img className="cta-am-light" src="/images/logos/agentmail-light.svg" alt="" />
                <img className="cta-am-dark" src="/images/logos/agentmail-dark.svg" alt="" />
              </span>
            ) : (
              <img className="cta-tile-logo" src={t.logo} alt="" />
            )}
            <span className="cta-tile-name">{t.name}</span>
          </a>
        ))}
      </div>

      <style>{`
        .aml-cta {
          padding-top: var(--aml-section-y);
          padding-bottom: var(--aml-section-y);
          display: flex;
          flex-direction: column;
          gap: 44px;
        }
        .cta-wall {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 14px;
        }
        .cta-tile {
          display: flex; align-items: center; gap: 12px;
          padding: 15px 17px;
          border-radius: 12px;
          background: var(--aml-card);
          border: 1px solid var(--aml-card-bd);
          text-decoration: none !important;
          color: inherit;
          transition: transform 0.25s var(--aml-ease), box-shadow 0.25s var(--aml-ease);
        }
        .cta-tile:hover { transform: translateY(-3px); box-shadow: var(--aml-shadow); }
        .cta-tile-logo {
          width: 22px; height: 22px;
          object-fit: contain;
          flex: none;
        }
        .cta-tile-logo--am { display: inline-flex; align-items: center; }
        .cta-tile-logo--am img { height: 22px; width: 22px; object-fit: contain; object-position: left; }
        .cta-am-dark { display: none; }
        .dark .cta-am-dark { display: inline; }
        .dark .cta-am-light { display: none; }
        .cta-tile-name {
          font-family: var(--aml-sans); font-weight: 600;
          font-size: 16px; letter-spacing: -0.02em; color: var(--aml-ink);
        }
        @media (max-width: 480px) {
          .cta-wall { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; }
          .cta-tile { padding: 13px 14px; gap: 10px; }
          .aml-cta .aml-btn { width: auto; }
        }
      `}</style>
    </section>
  );
};
