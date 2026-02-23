"use client";

import { useState, useRef } from "react";
import { Check, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function CodeBlock({
    children,
    className,
    ...props
}: React.ComponentPropsWithoutRef<"pre">) {
    const [copied, setCopied] = useState(false);
    const preRef = useRef<HTMLPreElement>(null);

    const onCopy = () => {
        if (preRef.current) {
            // Extract innerText from the pre block to reliably get formatting and breaks
            const text = preRef.current.innerText;
            navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="group relative my-6">
            <div className="absolute right-3 top-3 z-20 flex opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <AnimatePresence mode="wait">
                    {copied ? (
                        <motion.button
                            key="check"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="flex size-8 items-center justify-center rounded-md border border-success/30 bg-success/10 text-success backdrop-blur-sm"
                            aria-label="Copied"
                        >
                            <Check className="size-4" />
                        </motion.button>
                    ) : (
                        <motion.button
                            key="copy"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            onClick={onCopy}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex size-8 items-center justify-center rounded-md border border-border/50 bg-card/50 text-foreground-muted backdrop-blur-sm transition-colors hover:bg-muted hover:text-foreground"
                            aria-label="Copy code to clipboard"
                        >
                            <Copy className="size-4" />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
            <pre
                ref={preRef}
                className={cn(
                    "overflow-x-auto rounded-xl border border-border/50 bg-muted/40 p-5 text-sm leading-relaxed",
                    className
                )}
                {...props}
            >
                {children}
            </pre>
        </div>
    );
}
