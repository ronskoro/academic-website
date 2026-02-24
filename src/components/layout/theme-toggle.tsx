"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // On touch devices, briefly show the tooltip on mount to aid discoverability
    if (window.matchMedia("(hover: none)").matches) {
      setIsOpen(true);
      const timer = setTimeout(() => setIsOpen(false), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const startPress = () => {
    isLongPress.current = false;
    pressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      setTheme(resolvedTheme === "retro" ? "system" : "retro");
    }, 800);
  };

  const cancelPress = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  const handleClick = () => {
    cancelPress();
    // If it was a long press, skip the normal tap behavior
    if (isLongPress.current) {
      isLongPress.current = false;
      return;
    }
    // Normal toggle behavior
    if (resolvedTheme === "retro") {
      setTheme("system");
    } else {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="size-9">
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Tooltip open={isOpen} onOpenChange={setIsOpen}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-9 touch-none"
          onPointerDown={startPress}
          onPointerUp={cancelPress}
          onPointerLeave={cancelPress}
          onClick={handleClick}
          onContextMenu={(e) => e.preventDefault()}
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
          <span className="tracking-widest font-bold text-[oklch(0.85_0.25_140)] text-[10px]">
            <span className="hidden sm:inline">TYPE &apos;RETRO&apos;</span>
            <span className="sm:inline hidden block sm:hidden">LONG PRESS</span>
            <style>{`
              @media (max-width: 639px) {
                .sm\\:hidden { display: inline !important; }
                .sm\\:inline { display: none !important; }
              }
            `}</style>
          </span>
          <span className="w-1.5 h-3 bg-[oklch(0.85_0.25_140)] animate-[pulse_1s_ease-in-out_infinite]"></span>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
