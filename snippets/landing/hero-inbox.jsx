// AgentMail landing — hero art: "the agent is a user in the inbox".
// An email arrives, the agent's cursor selects it (Figma-style selection),
// a reply drafts itself, and a sent chip flows out. Monochrome; the accent
// (white in dark, ink in light) marks the agent acting.
// NOTE: Mintlify evaluates only the exported component — all constants live
// INSIDE the component body.

export const LandingHero = () => {
  const W = 560;
  const H = 470;

  return (
    <div className="hero-wrap" aria-hidden="true">
      <div className="hero-stage">
        <div className="hero-glow" />

        {/* incoming event chip + connector */}
        <div className="hero-chip hero-chip--in">message.received</div>
        <svg className="hero-conn" viewBox={`0 0 ${W} ${H}`} fill="none">
          <path className="hero-dash" d="M 84 40 C 104 70 114 80 130 92" />
          <path className="hero-dash" d="M 418 390 C 432 406 444 416 458 424" />
        </svg>

        {/* inbox card */}
        <div className="hero-card">
          <div className="hero-card-head">
            <span className="hero-card-label">INBOX</span>
            <span className="hero-card-addr">ava@yourco.com</span>
            <span className="hero-card-dot" />
          </div>

          <div className="hero-msg">
            <div className="hero-avatar">S</div>
            <div className="hero-msg-body">
              <div className="hero-msg-top">
                <span className="hero-msg-name">Sam Rivera</span>
                <span className="hero-msg-time">9:41 AM</span>
              </div>
              <div className="hero-msg-from">sam@customer.com</div>
              <div className="hero-msg-text">
                Hey — can you send over the June invoice? Finance needs it
                before the end of the day.
              </div>
            </div>
            {/* selection box + handles */}
            <div className="hero-sel">
              <i className="h tl" /><i className="h tr" /><i className="h bl" /><i className="h br" />
            </div>
          </div>

          <div className="hero-reply">
            <div className="hero-reply-label">REPLY — DRAFTING</div>
            <div className="hero-reply-text">
              Attached — here's the June invoice. Let me know if you need
              anything else.<span className="hero-caret" />
            </div>
          </div>
        </div>

        {/* agent cursor + name pill */}
        <svg className="hero-cursor" viewBox="0 0 18 19" width="18" height="19">
          <path d="M 1 1 L 13 11 L 8 11.8 L 10.8 17.5 L 8.6 18.6 L 5.8 12.8 L 1 16.5 Z" />
        </svg>
        <div className="hero-pill">ava@yourco.com</div>

        {/* sent chip */}
        <div className="hero-chip hero-chip--sent">sent ✓</div>
      </div>

      <style>{`
        .hero-wrap {
          container-type: inline-size;
          width: 100%;
          max-width: 560px;
          margin-left: auto;
        }
        .hero-stage {
          position: relative;
          width: 560px;
          height: 470px;
          transform-origin: top left;
          transform: scale(calc(100cqw / 560));
          font-family: var(--aml-sans);
        }
        .hero-glow {
          position: absolute;
          left: 100px; top: 0;
          width: 460px; height: 460px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--aml-glow) 0%, transparent 70%);
        }
        .hero-conn { position: absolute; inset: 0; width: 100%; height: 100%; }
        .hero-dash {
          stroke: var(--aml-conn);
          stroke-width: 1.2;
          stroke-dasharray: 5 5;
        }
        .hero-card {
          position: absolute;
          left: 95px; top: 55px;
          width: 430px;
          border-radius: 14px;
          background: var(--aml-card);
          border: 1px solid var(--aml-card-bd);
          box-shadow: var(--aml-shadow);
          padding-bottom: 20px;
        }
        .hero-card-head {
          display: flex; align-items: center; gap: 10px;
          padding: 16px 20px 12px;
          border-bottom: 1px solid var(--aml-card-bd);
        }
        .hero-card-label {
          font-family: var(--aml-mono); font-size: 10px;
          letter-spacing: 0.28em; color: var(--aml-muted);
        }
        .hero-card-addr {
          font-family: var(--aml-mono); font-size: 12px; color: var(--aml-ink);
        }
        .hero-card-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--aml-acc);
        }
        .hero-msg {
          position: relative;
          display: flex; gap: 12px;
          margin: 16px 20px 0;
          padding: 6px 4px 12px;
        }
        .hero-avatar {
          flex: none;
          width: 32px; height: 32px; border-radius: 50%;
          background: color-mix(in srgb, var(--aml-ink) 10%, var(--aml-card));
          color: var(--aml-ink-2);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 500;
        }
        .hero-msg-body { min-width: 0; }
        .hero-msg-top { display: flex; justify-content: space-between; gap: 12px; }
        .hero-msg-name { font-size: 14px; font-weight: 500; color: var(--aml-ink); }
        .hero-msg-time { font-family: var(--aml-mono); font-size: 10px; color: var(--aml-muted); }
        .hero-msg-from { font-family: var(--aml-mono); font-size: 11px; color: var(--aml-muted); margin-top: 2px; }
        .hero-msg-text { font-size: 13.5px; line-height: 1.45; color: var(--aml-ink-2); margin-top: 8px; }
        .hero-sel {
          position: absolute; inset: -6px -8px;
          border: 1.5px dashed var(--aml-acc);
          border-radius: 6px;
          pointer-events: none;
        }
        .hero-sel .h {
          position: absolute;
          width: 10px; height: 10px; border-radius: 2px;
          background: var(--aml-card);
          border: 1.5px solid var(--aml-acc);
        }
        .hero-sel .tl { left: -5px; top: -5px; }
        .hero-sel .tr { right: -5px; top: -5px; }
        .hero-sel .bl { left: -5px; bottom: -5px; }
        .hero-sel .br { right: -5px; bottom: -5px; }
        .hero-reply {
          margin: 14px 20px 0;
          border-radius: 10px;
          background: var(--aml-tint);
          border: 1px solid var(--aml-card-bd);
          padding: 13px 16px 15px;
        }
        .hero-reply-label {
          font-family: var(--aml-mono); font-size: 10px;
          letter-spacing: 0.24em; color: var(--aml-muted);
        }
        .hero-reply-text {
          font-size: 13.5px; line-height: 1.5; color: var(--aml-ink);
          margin-top: 8px;
        }
        .hero-caret {
          display: inline-block;
          width: 7px; height: 14px;
          margin-left: 3px;
          vertical-align: -2px;
          background: var(--aml-acc);
        }
        .hero-cursor {
          position: absolute; left: 492px; top: 218px;
          fill: var(--aml-acc);
          stroke: var(--aml-bg);
          stroke-width: 1;
        }
        .hero-pill {
          position: absolute; left: 448px; top: 242px;
          font-family: var(--aml-mono); font-size: 11px;
          background: var(--aml-acc); color: var(--aml-acc-contrast);
          padding: 5px 10px; border-radius: 6px;
          white-space: nowrap;
        }
        .hero-chip {
          position: absolute;
          font-family: var(--aml-mono); font-size: 11px;
          padding: 7px 12px; border-radius: 8px;
          white-space: nowrap;
        }
        .hero-chip--in {
          left: 4px; top: 6px;
          color: var(--aml-ink-2);
          background: var(--aml-card);
          border: 1px dashed var(--aml-conn);
        }
        .hero-chip--sent {
          left: 452px; top: 424px;
          background: var(--aml-acc); color: var(--aml-acc-contrast);
        }
        @media (prefers-reduced-motion: no-preference) {
          .hero-caret { animation: hero-blink 1.1s steps(1) infinite; }
          @keyframes hero-blink { 50% { opacity: 0; } }
          .hero-dash { animation: hero-march 1.6s linear infinite; }
          @keyframes hero-march { to { stroke-dashoffset: -20; } }
          .hero-chip--in { animation: hero-float 5s ease-in-out infinite; }
          .hero-chip--sent { animation: hero-float 5s ease-in-out 2.5s infinite; }
          @keyframes hero-float { 50% { transform: translateY(-4px); } }
          .hero-sel { animation: hero-selpulse 3.2s ease-in-out infinite; }
          @keyframes hero-selpulse { 50% { opacity: 0.65; } }
        }
        /* the stage scales with the container; keep height in sync */
        .hero-wrap { aspect-ratio: 560 / 470; }
        @media (max-width: 900px) {
          .hero-wrap { margin: 0 auto; }
        }
      `}</style>
    </div>
  );
};
