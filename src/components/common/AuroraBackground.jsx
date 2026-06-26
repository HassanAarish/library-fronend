/**
 * Fixed, decorative aurora gradient field + faint grid that sits behind all
 * authenticated and auth screens. Purely presentational (pointer-events: none).
 */
const AuroraBackground = () => {
  return (
    <>
      <div className="aurora-field" aria-hidden="true" />
      <div className="aurora-grid" aria-hidden="true" />
    </>
  );
};

export default AuroraBackground;
