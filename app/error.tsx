"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="font-serif text-4xl font-bold text-neutral-900">
            Something went wrong
          </h1>
          <p className="text-neutral-600">
            We encountered an error while loading the news. Please try again.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="rounded-full border-2 border-neutral-900 bg-neutral-900 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-red-600 hover:border-red-600"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="rounded-full border-2 border-neutral-900 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wider text-neutral-900 transition-colors hover:border-red-600 hover:text-red-600"
          >
            Go Home
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && error.message && (
          <div className="mt-8 rounded border border-red-200 bg-red-50 p-4 text-left">
            <p className="font-mono text-xs text-red-800">{error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
