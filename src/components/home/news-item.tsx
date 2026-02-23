import { cn } from "@/lib/utils";

interface NewsItemProps {
    date: string;
    text: string;
    className?: string;
}

export function NewsItem({ date, text, className }: NewsItemProps) {
    return (
        <div
            className={cn(
                "group relative flex flex-col sm:flex-row gap-3 sm:gap-4 rounded-lg border border-transparent p-2 transition-colors hover:bg-muted/50",
                className
            )}
        >
            <span className="shrink-0 flex items-center justify-center w-24 h-fit rounded-full bg-accent-blue/10 px-2.5 py-1 text-xs font-medium text-accent-blue ring-1 ring-inset ring-accent-blue/20">
                {date}
            </span>
            <span className="text-foreground-muted text-sm my-auto leading-relaxed">
                {text}
            </span>
        </div >
    );
}
