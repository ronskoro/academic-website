"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function SpotlightCard({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            className={cn(
                "group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] active:scale-[0.98] hover:border-accent-blue/40 hover:shadow-md dark:hover:shadow-none dark:bg-card/40 dark:backdrop-blur-md",
                className
            )}
            {...props}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(120, 180, 255, 0.1), transparent 40%)`,
                }}
                aria-hidden="true"
            />
            <div className="relative z-10 w-full h-full p-5">
                {children}
            </div>
        </div>
    );
}
