// AgentMail landing — use-case cards. Four end-to-end workflows customers
// actually build, each with a hand-built UI mock (no images).
// All constants live INSIDE the component body (Mintlify snippet rule).

export const LandingUseCases = () => {
  const Chip = ({ children, variant }) => (
    <span className={`uc-chip uc-chip--${variant || "outline"}`}>{children}</span>
  );

  return (
    <section className="aml-section aml-uc">
      <div className="aml-secthead">
        <div className="aml-secthead-left">
          <div className="aml-kicker">USE CASES</div>
          <h2 className="aml-h2">
            <span className="ln">Built For Real</span>
            <span className="ln aml-grad">Email Workflows.</span>
          </h2>
        </div>
        <div className="aml-secthead-right">
          <p className="aml-secthead-copy">
            End-to-end cookbooks your agent can follow. Every example ships in
            TypeScript and Python, with a repo.
          </p>
          <a className="aml-btn aml-btn--ghost" href="/quickstart">
            <span>View all examples</span>
            <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div className="uc-grid">
        {/* 1 — Outbound GTM */}
        <a className="uc-card" href="/tasks/send">
          <div className="uc-tag-row">
            <span className="uc-tag">/messages/send</span>
            <span className="uc-arrow">↗</span>
          </div>
          <h3 className="uc-title">Outbound GTM agent</h3>
          <p className="uc-desc">
            Personalized outreach, reply classification, and warm handoff to a
            human when a lead is hot.
          </p>
          <div className="uc-mock">
            <div className="uc-row"><span>Re: pricing for 50 seats</span><Chip variant="fill">INTERESTED</Chip></div>
            <div className="uc-row"><span>Out of office until Monday</span><Chip>FOLLOW UP</Chip></div>
            <div className="uc-row"><span>Re: not right now, thanks</span><Chip>ARCHIVE</Chip></div>
            <div className="uc-note">hot lead → handed to sales@yourco.com</div>
          </div>
        </a>

        {/* 2 — Inbox per user */}
        <a className="uc-card" href="/architecture">
          <div className="uc-tag-row">
            <span className="uc-tag">/pods · /inboxes</span>
            <span className="uc-arrow">↗</span>
          </div>
          <h3 className="uc-title">An inbox for every user</h3>
          <p className="uc-desc">
            Provision a pod and an inbox per customer. Scoped keys keep every
            tenant isolated.
          </p>
          <div className="uc-mock">
            <div className="uc-row"><span className="uc-mono"><em>acme</em> ava@acme-mail.com</span><span className="uc-check">✓</span></div>
            <div className="uc-row"><span className="uc-mono"><em>bolt</em> mia@bolt-mail.com</span><span className="uc-check">✓</span></div>
            <div className="uc-row"><span className="uc-mono"><em>zeno</em> kai@zeno-mail.com</span><span className="uc-check">✓</span></div>
            <div className="uc-note">+ 4,318 more inboxes</div>
          </div>
        </a>

        {/* 3 — OTP */}
        <a className="uc-card" href="/tasks/receive">
          <div className="uc-tag-row">
            <span className="uc-tag">message.received</span>
            <span className="uc-arrow">↗</span>
          </div>
          <h3 className="uc-title">Sign up and read the OTP</h3>
          <p className="uc-desc">
            Email is the account layer of the internet. Your agent signs up for
            services and completes verification on its own.
          </p>
          <div className="uc-mock">
            <div className="uc-mail-head">
              <div className="uc-mail-subj">Your verification code</div>
              <div className="uc-mail-from">no-reply@notion.so → ava@yourco.com</div>
            </div>
            <div className="uc-code">
              {["4", "8", "2", "9", "1", "3"].map((d, i) => (
                <span key={i} className="uc-digit">{d}</span>
              ))}
            </div>
            <div className="uc-verify">
              <Chip variant="fill">account verified ✓</Chip>
              <span className="uc-note-inline">read by agent in 0.4s</span>
            </div>
          </div>
        </a>

        {/* 4 — Support triage */}
        <a className="uc-card" href="/tasks/conversations">
          <div className="uc-tag-row">
            <span className="uc-tag">webhooks</span>
            <span className="uc-arrow">↗</span>
          </div>
          <h3 className="uc-title">Support triage agent</h3>
          <p className="uc-desc">
            Classify, label, draft, and escalate — straight from the support
            inbox.
          </p>
          <div className="uc-mock">
            <div className="uc-row"><span>Refund for a duplicate charge</span><span className="uc-chips"><Chip>billing</Chip><Chip variant="fill">urgent</Chip></span></div>
            <div className="uc-row"><span>Can't log in to the dashboard</span><Chip>account</Chip></div>
            <div className="uc-row"><span>Feature idea: dark mode</span><Chip>backlog</Chip></div>
            <div className="uc-note">3 drafts ready for review</div>
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
        .uc-mono { font-family: var(--aml-mono); font-size: 12px; color: var(--aml-ink); }
        .uc-mono em { font-style: normal; color: var(--aml-muted); margin-right: 8px; font-size: 11px; }
        .uc-check { color: var(--aml-ink); font-weight: 500; }
        .uc-chips { display: inline-flex; gap: 6px; }
        .uc-chip {
          font-family: var(--aml-mono); font-size: 10px; letter-spacing: 0.02em;
          padding: 4px 9px; border-radius: 6px; white-space: nowrap;
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
        .uc-note-inline {
          font-family: var(--aml-mono); font-size: 10.5px; color: var(--aml-muted);
        }
        .uc-mail-head { display: flex; flex-direction: column; gap: 2px; }
        .uc-mail-subj { font-size: 13.5px; font-weight: 500; color: var(--aml-ink); }
        .uc-mail-from { font-family: var(--aml-mono); font-size: 10.5px; color: var(--aml-muted); }
        .uc-code { display: flex; gap: 8px; }
        .uc-digit {
          font-family: var(--aml-mono); font-size: 16px; color: var(--aml-ink);
          background: var(--aml-card);
          border: 1px solid var(--aml-card-bd);
          border-radius: 8px;
          padding: 8px 11px;
        }
        .uc-verify { display: flex; align-items: center; gap: 8px; }
        @media (max-width: 900px) {
          .uc-grid { grid-template-columns: minmax(0, 1fr); }
        }
        @media (max-width: 480px) {
          .uc-code { flex-wrap: wrap; }
          .aml-uc .aml-btn { width: auto; }
        }
      `}</style>
    </section>
  );
};
