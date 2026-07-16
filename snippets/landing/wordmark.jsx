// AgentMail landing — giant fading wordmark.
export const LandingWordmark = () => {
  return (
    <div className="aml-word" aria-hidden="true">
      <div className="aml-word-mark">AgentMail</div>
      <style>{`
        .aml-word {
          overflow: hidden;
          display: flex;
          justify-content: center;
          padding: 30px 0 0;
        }
        .aml-word-mark {
          font-family: var(--aml-sans);
          font-weight: 800;
          font-size: clamp(72px, 15.5vw, 218px);
          letter-spacing: -0.045em;
          line-height: 1.02;
          white-space: nowrap;
          background: linear-gradient(
            180deg,
            var(--aml-ink) 0%,
            color-mix(in srgb, var(--aml-ink) 16%, var(--aml-bg)) 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: -0.14em; /* crop the descender into the divider */
        }
      `}</style>
    </div>
  );
};
