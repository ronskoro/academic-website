import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProfileImageProps {
    src: string;
    alt: string;
    className?: string;
}

export function ProfileImage({ src, alt, className }: ProfileImageProps) {
    return (
        <div className={cn("mx-auto w-fit lg:mx-0", className)}>
            <div className="group relative size-48 overflow-hidden rounded-2xl border border-border lg:size-[200px] transition-all duration-500 hover:border-accent-blue/50 hover:shadow-xl hover:shadow-accent-blue/20 dark:hover:shadow-accent-blue/10">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                />
            </div>
        </div>
    );
}
