/**
 * Grano de película sobre toda la página. Es lo que separa una superficie
 * digital plana de algo que parece impreso o filmado.
 */
export default function Grain() {
  return (
    <>
      <div className="u-grain" aria-hidden="true" />
      {/* Viñeta fija muy sutil: enfoca la mirada hacia el centro */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[69]"
        style={{
          background:
            "radial-gradient(ellipse 100% 75% at 50% 50%, transparent 55%, rgba(7,4,11,0.45) 100%)",
        }}
      />
    </>
  );
}
