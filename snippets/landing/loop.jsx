// AgentMail landing — "the loop": senders -> INBOX -> webhook -> your agent,
// with the reply arcing back into the same thread. Fixed 1100x430 stage scaled
// by container width; reflows to a vertical column on small screens.
// All constants live INSIDE the component body (Mintlify snippet rule).

export const LandingLoop = () => {
  const SENDERS = [
    { kind: "HUMAN", addr: "sam@customer.com", y: 30 },
    { kind: "SERVICE", addr: "receipts@stripe.com", y: 165 },
    { kind: "AGENT", addr: "scout@partner.ai", y: 300 },
  ];

  return (
    <section className="aml-section aml-loop">
      <div className="aml-secthead">
        <div className="aml-secthead-left">
          <div className="aml-kicker">HOW IT WORKS</div>
          <h2 className="aml-h2">
            <span className="ln">Ship An Agent That</span>
            <span className="ln aml-grad">Answers Its Own Email.</span>
          </h2>
        </div>
        <div className="aml-secthead-right">
          <p className="aml-secthead-copy">
            Mail hits the inbox, a webhook wakes your agent, and the reply
            lands in the same thread. No human sitting in a mail client.
          </p>
        </div>
      </div>

      <div className="loop-wrap" aria-hidden="true">
        <div className="loop-stage">
          <div className="loop-glow" />

          <svg className="loop-conn" viewBox="0 0 1100 430" fill="none">
            <path className="loop-dash" d="M 195 60 C 285 80 355 140 435 172" />
            <path className="loop-dash" d="M 205 190 C 285 195 355 198 435 200" />
            <path className="loop-dash" d="M 195 325 C 285 305 355 258 435 228" />
            <path className="loop-dash" d="M 665 200 C 735 200 810 200 890 200" />
            <path className="loop-dash loop-arc" d="M 985 250 C 985 380 450 425 160 360" />
          </svg>

          <div className="loop-senders">
            {SENDERS.map((s) => (
              <div key={s.kind} className="loop-sender" style={{ top: s.y }}>
                <span className="loop-sender-kind">{s.kind}</span>
                <span className="loop-sender-addr">{s.addr}</span>
              </div>
            ))}
          </div>

          <div className="loop-inbox">
            <i className="h tl" /><i className="h tr" /><i className="h bl" /><i className="h br" />
            <div className="loop-inbox-label">INBOX</div>
            <div className="loop-inbox-addr">ava@yourco.com</div>
          </div>

          <div className="loop-chip loop-chip--webhook">webhook</div>

          <div className="loop-agent">
            <div className="loop-agent-label">YOUR AGENT</div>
            <div className="loop-agent-sub">decides · replies</div>
          </div>

          <div className="loop-chip loop-chip--reply">reply — same thread</div>
        </div>
      </div>

      <style>{`
        .aml-loop {
          padding-top: var(--aml-section-y);
          padding-bottom: var(--aml-section-y);
          display: flex;
          flex-direction: column;
          gap: 48px;
        }
        .loop-wrap {
          container-type: inline-size;
          width: 100%;
          overflow: clip;
        }
        .loop-stage {
          position: relative;
          width: 1100px;
          height: 430px;
          transform-origin: top left;
          /* tan(atan2()) divides two lengths into the plain number scale() needs */
          transform: scale(tan(atan2(100cqw, 1100px)));
        }
        .loop-wrap { aspect-ratio: 1100 / 430; }
        .loop-glow {
          position: absolute; left: 360px; top: 10px;
          width: 380px; height: 380px; border-radius: 50%;
          background: radial-gradient(circle, var(--aml-glow) 0%, transparent 70%);
        }
        .loop-conn { position: absolute; inset: 0; width: 100%; height: 100%; }
        .loop-dash {
          stroke: var(--aml-conn);
          stroke-width: 1.2;
          stroke-dasharray: 5 5;
        }
        .loop-senders { display: contents; }
        .loop-sender {
          position: absolute; left: 0;
          display: flex; flex-direction: column; gap: 3px;
          padding: 12px 16px;
          border-radius: 10px;
          background: var(--aml-card);
          border: 1px solid var(--aml-card-bd);
          box-shadow: var(--aml-shadow);
        }
        .loop-sender-kind {
          font-family: var(--aml-mono); font-size: 9px;
          letter-spacing: 0.3em; color: var(--aml-muted);
        }
        .loop-sender-addr {
          font-family: var(--aml-mono); font-size: 12px; color: var(--aml-ink-2);
        }
        .loop-inbox {
          position: absolute; left: 435px; top: 140px;
          width: 230px; height: 120px;
          border: 1.5px dashed var(--aml-acc);
          border-radius: 12px;
          background: var(--aml-tint);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 4px;
        }
        .loop-inbox .h {
          position: absolute;
          width: 11px; height: 11px; border-radius: 2px;
          background: var(--aml-card);
          border: 1.5px solid var(--aml-acc);
        }
        .loop-inbox .tl { left: -6px; top: -6px; }
        .loop-inbox .tr { right: -6px; top: -6px; }
        .loop-inbox .bl { left: -6px; bottom: -6px; }
        .loop-inbox .br { right: -6px; bottom: -6px; }
        .loop-inbox-label {
          font-family: var(--aml-sans); font-weight: 700;
          font-size: 22px; letter-spacing: -0.02em; color: var(--aml-ink);
        }
        .loop-inbox-addr {
          font-family: var(--aml-mono); font-size: 11px; color: var(--aml-muted);
        }
        .loop-agent {
          position: absolute; left: 890px; top: 158px;
          display: flex; flex-direction: column; gap: 5px;
          padding: 18px 22px;
          border-radius: 12px;
          background: var(--aml-card);
          border: 1px solid var(--aml-card-bd);
          box-shadow: var(--aml-shadow);
        }
        .loop-agent-label {
          font-family: var(--aml-sans); font-weight: 700;
          font-size: 18px; letter-spacing: -0.02em; color: var(--aml-ink);
        }
        .loop-agent-sub {
          font-family: var(--aml-mono); font-size: 11px; color: var(--aml-muted);
        }
        .loop-chip {
          position: absolute;
          font-family: var(--aml-mono); font-size: 11px;
          padding: 6px 12px; border-radius: 8px;
          white-space: nowrap;
        }
        .loop-chip--webhook {
          left: 738px; top: 186px;
          color: var(--aml-ink-2);
          background: var(--aml-card);
          border: 1px dashed var(--aml-conn);
        }
        .loop-chip--reply {
          left: 490px; top: 400px;
          background: var(--aml-acc); color: var(--aml-acc-contrast);
        }
        @media (prefers-reduced-motion: no-preference) {
          .loop-dash { animation: loop-march 1.6s linear infinite; }
          @keyframes loop-march { to { stroke-dashoffset: -20; } }
        }
        /* mobile reflow: abandon the stage, stack the actors */
        @media (max-width: 768px) {
          .loop-wrap { aspect-ratio: auto; }
          .loop-stage {
            width: 100%; height: auto; transform: none;
            display: flex; flex-direction: column; gap: 14px; align-items: stretch;
          }
          .loop-conn, .loop-glow, .loop-inbox .h, .loop-chip--reply { display: none; }
          .loop-sender, .loop-inbox, .loop-agent, .loop-chip--webhook {
            position: static; width: auto; height: auto;
          }
          .loop-senders { display: flex; flex-direction: column; gap: 10px; }
          .loop-inbox { padding: 22px 16px; }
          .loop-chip--webhook { align-self: center; }
        }
      `}</style>
    </section>
  );
};
