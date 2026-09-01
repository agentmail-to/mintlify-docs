// AgentMail landing — example cards. The three cookbooks from the docs'
// Examples section, each with a hand-built UI mock (no images).
// All constants live INSIDE the component body (Mintlify snippet rule).

export const LandingUseCases = () => {
  const Chip = ({ children, variant }) => (
    <span className={`uc-chip uc-chip--${variant || "outline"}`}>{children}</span>
  );

  return (
    <section className="aml-section aml-uc">
      <div className="aml-secthead">
        <div className="aml-secthead-left">
          <div className="aml-kicker">EXAMPLES</div>
          <h2 className="aml-h2">
            <span className="ln">Built For Real</span>
            <span className="ln aml-grad">Email Workflows.</span>
          </h2>
        </div>
        <div className="aml-secthead-right">
          <p className="aml-secthead-copy">
            Three end-to-end cookbooks, built on Vercel Eve with AgentMail as
            the email layer. Copy the prompt into your coding agent and build
            it.
          </p>
        </div>
      </div>

      <div className="uc-grid">
        {/* 1 — Outbound GTM / SDR agent */}
        <a className="uc-card" href="/examples/outbound-gtm-sdr-agent">
          <div className="uc-tag-row">
            <span className="uc-tag">/messages/send</span>
            <span className="uc-arrow">↗</span>
          </div>
          <h3 className="uc-title">Outbound GTM / SDR agent</h3>
          <p className="uc-desc">
            Researches every lead, sends personal first touches from its own
            inbox, follows up on silence, and hands hot leads to a human.
          </p>
          <div className="uc-mock">
            <div className="uc-row"><span>Re: pricing for 50 seats</span><Chip variant="fill">INTERESTED</Chip></div>
            <div className="uc-row"><span>Out of office until Monday</span><Chip>FOLLOW UP</Chip></div>
            <div className="uc-row"><span>Re: not right now, thanks</span><Chip>ARCHIVE</Chip></div>
            <div className="uc-note">hot lead → handed to sales@yourco.com</div>
          </div>
        </a>

        {/* 2 — Customer support agent */}
        <a className="uc-card" href="/examples/customer-support-agent">
          <div className="uc-tag-row">
            <span className="uc-tag">message.received</span>
            <span className="uc-arrow">↗</span>
          </div>
          <h3 className="uc-title">Customer support agent</h3>
          <p className="uc-desc">
            Answers every support email from your docs and past threads,
            in-thread. When it is not sure, it leaves a draft for a human.
          </p>
          <div className="uc-mock">
            <div className="uc-row"><span>How do I rotate an API key?</span><Chip>ANSWERED</Chip></div>
            <div className="uc-row"><span>Can't log in to the dashboard</span><Chip>ANSWERED</Chip></div>
            <div className="uc-row"><span>Refund for a duplicate charge</span><Chip variant="fill">DRAFT</Chip></div>
            <div className="uc-note">unsure → saved as a draft for review</div>
          </div>
        </a>

        {/* 3 — AI employee with its own inbox (wide) */}
        <a className="uc-card uc-card--wide" href="/examples/ai-employee-with-its-own-inbox">
          <div className="uc-wide-copy">
            <div className="uc-tag-row">
              <span className="uc-tag">/inboxes</span>
              <span className="uc-arrow">↗</span>
            </div>
            <h3 className="uc-title">An AI employee with its own inbox</h3>
            <p className="uc-desc">
              A teammate with a real address on your domain. CC it into
              threads, forward it documents, or email it tasks directly — it
              does the work and replies to everyone with the result.
            </p>
          </div>
          <div className="uc-mock">
            <div className="uc-row"><span>CC: ava — take over the vendor renewal</span><Chip variant="fill">ON IT</Chip></div>
            <div className="uc-row"><span>Fwd: Q3 offsite budget.xlsx</span><Chip>SUMMARIZED</Chip></div>
            <div className="uc-row"><span>Can you schedule the Acme kickoff?</span><Chip>REPLIED ALL</Chip></div>
            <div className="uc-note">07:30 — morning digest: 6 tasks done</div>
          </div>
        </a>
      </div>

      <style>{`
        .aml-uc {
          padding-top: var(--aml-section-y);
          padding-bottom: var(--aml-section-y);
          display: flex;
          flex-direction: column;
          gap: 44px;
        }
        .uc-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 24px;
        }
        .uc-card {
          border-radius: 14px;
          background: var(--aml-card);
          border: 1px solid var(--aml-card-bd);
          padding: 22px 24px 24px;
          display: flex; flex-direction: column; gap: 10px;
          transition: transform 0.25s var(--aml-ease), box-shadow 0.25s var(--aml-ease);
        }
        a.uc-card { text-decoration: none; color: inherit; }
        .uc-card:hover { transform: translateY(-3px); box-shadow: var(--aml-shadow); }
        .uc-card:hover .uc-arrow { color: var(--aml-ink); }
        .uc-card--wide {
          grid-column: 1 / -1;
          flex-direction: row;
          align-items: center;
          gap: 32px;
        }
        .uc-wide-copy {
          flex: 1 1 46%;
          min-width: 0;
          display: flex; flex-direction: column; gap: 10px;
        }
        .uc-card--wide .uc-mock { flex: 1 1 54%; min-width: 0; margin-top: 0; }
        .uc-tag-row { display: flex; justify-content: space-between; align-items: center; }
        .uc-tag {
          font-family: var(--aml-mono); font-size: 12px; color: var(--aml-ink-2);
          display: inline-flex; align-items: center; gap: 7px;
        }
        .uc-tag::before {
          content: "";
          width: 5px; height: 5px; border-radius: 1px;
          background: var(--aml-acc);
        }
        .uc-arrow { color: var(--aml-muted); font-size: 15px; }
        .uc-title {
          margin: 0;
          font-family: var(--aml-sans); font-weight: 600;
          font-size: 21px; letter-spacing: -0.02em; color: var(--aml-ink);
        }
        .uc-desc {
          margin: 0;
          font-size: 14px; line-height: 1.5; color: var(--aml-ink-2);
        }
        .uc-mock {
          margin-top: 8px;
          border-radius: 10px;
          background: var(--aml-tint);
          padding: 14px 16px;
          display: flex; flex-direction: column; gap: 8px;
        }
        .uc-row {
          display: flex; justify-content: space-between; align-items: center; gap: 12px;
          padding: 9px 12px;
          border-radius: 8px;
          background: var(--aml-card);
          border: 1px solid var(--aml-card-bd);
          font-size: 13px; color: var(--aml-ink-2);
        }
        .uc-row > span:first-child {
          min-width: 0;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .uc-chip {
          font-family: var(--aml-mono); font-size: 10px; letter-spacing: 0.02em;
          padding: 4px 9px; border-radius: 6px; white-space: nowrap;
          flex: none;
        }
        .uc-chip--outline {
          color: var(--aml-muted);
          border: 1px solid var(--aml-card-bd);
        }
        .uc-chip--fill {
          background: var(--aml-acc); color: var(--aml-acc-contrast);
        }
        .uc-note {
          font-family: var(--aml-mono); font-size: 10.5px; color: var(--aml-muted);
        }
        @media (max-width: 900px) {
          .uc-grid { grid-template-columns: minmax(0, 1fr); }
          .uc-card--wide { flex-direction: column; align-items: stretch; gap: 10px; }
          .uc-card--wide .uc-mock { margin-top: 8px; }
        }
        @media (max-width: 480px) {
          .aml-uc .aml-btn { width: auto; }
        }
      `}</style>
    </section>
  );
};
