"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="size-9">
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-9"
          onClick={() => {
            if (resolvedTheme === "retro") {
              setTheme("system");
            } else {
              setTheme(resolvedTheme === "dark" ? "light" : "dark");
            }
          }}
        >
          {resolvedTheme === "dark" || resolvedTheme === "retro" ? (
            <Sun className="size-4 transition-transform duration-300" />
          ) : (
            <Moon className="size-4 transition-transform duration-300" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={14} className="matrix-tooltip px-3 py-1.5 text-xs">
        <div className="flex items-center gap-1 relative z-20">
          <span className="opacity-80 text-[oklch(0.85_0.25_140)]">&gt;</span>
          <span className="tracking-widest font-bold text-[oklch(0.85_0.25_140)] tracking-widest text-[10px]">TYPE &apos;RETRO&apos;</span>
          <span className="w-1.5 h-3 bg-[oklch(0.85_0.25_140)] animate-[pulse_1s_ease-in-out_infinite]"></span>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
