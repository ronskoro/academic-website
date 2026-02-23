"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service securely
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold tracking-tight">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-center text-foreground-muted">
        An unexpected error occurred. Please try again.
      </p>
      <Button onClick={reset} className="mt-8">
        Try again
      </Button>
    </div>
  );
}
