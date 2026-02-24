"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export function EasterEgg() {
    const { setTheme, theme } = useTheme();

    useEffect(() => {
        let keyBuffer = "";
        const target = "retro";

        const handleKeyDown = (e: KeyboardEvent) => {
            // Append to buffer and keep only the last N characters
            keyBuffer = (keyBuffer + e.key.toLowerCase()).slice(-target.length);

            if (keyBuffer === target) {
                if (theme === "retro") {
                    setTheme("system");
                } else {
                    setTheme("retro");
                }
                keyBuffer = ""; // Reset buffer after match
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [theme, setTheme]);

    return null;
}
