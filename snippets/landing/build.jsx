// AgentMail landing — build strip. Points people who don't know what to
// build yet at agentmail.to/build, which turns a description of what they
// are working on into a blueprint plus a coding-agent prompt.

export const LandingBuild = () => {
  return (
    <section className="aml-section aml-build">
      <div className="aml-secthead">
        <div className="aml-secthead-left">
          <div className="aml-kicker">BLUEPRINTS</div>
          <h2 className="aml-h2">
            <span className="ln">Not Sure</span>
            <span className="ln aml-grad">What To Build?</span>
          </h2>
        </div>
        <div className="aml-secthead-right">
          <p className="aml-secthead-copy">
            Describe what you are working on and get a blueprint back, with a
            prompt your coding agent can build from.
          </p>
          <a className="aml-btn aml-btn--primary" href="https://agentmail.to/build">
            <span>Get a blueprint</span>
            <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <style>{`
        .aml-build {
          padding-top: 72px;
          padding-bottom: 72px;
        }
        @media (max-width: 480px) {
          .aml-build { padding-top: 48px; padding-bottom: 48px; }
          .aml-build .aml-btn { width: auto; }
        }
      `}</style>
    </section>
  );
};
