"use client";

export function GrainOverlay() {
    return (
        <div className="pointer-events-none fixed inset-0 z-50 h-screen w-full opacity-[0.25] mix-blend-overlay dark:opacity-[0.15]">
            <svg className="absolute inset-0 h-full w-full">
                <filter id="noiseFilter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.75"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
        </div>
    );
}
