import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-bold tracking-tight">404</h1>
      <p className="mt-4 text-lg text-foreground-muted">
        This page could not be found.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  );
}
