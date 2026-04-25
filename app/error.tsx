"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <span className="text-orange text-4xl block mb-6">◆</span>
        <h2 className="font-cinzel font-700 text-white text-2xl uppercase tracking-wide mb-4">
          Something went wrong
        </h2>
        <p className="font-barlow font-300 text-muted text-sm mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button variant="primary" onClick={reset}>
            Try Again
          </Button>
          <Button variant="secondary" href="/">
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
