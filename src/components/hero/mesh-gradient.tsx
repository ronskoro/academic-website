export function MeshGradient() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-30 dark:opacity-20"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, oklch(0.65 0.14 245 / 0.4), transparent),
            radial-gradient(ellipse 60% 80% at 80% 20%, oklch(0.58 0.16 245 / 0.3), transparent),
            radial-gradient(ellipse 70% 60% at 50% 90%, oklch(0.70 0.12 245 / 0.2), transparent)
          `,
          backgroundSize: "200% 200%, 200% 200%, 200% 200%",
          animation: "mesh-move 20s ease-in-out infinite",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  );
}
