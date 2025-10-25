export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Header skeleton */}
        <div className="mb-8 h-12 animate-pulse rounded bg-neutral-200" />
        
        {/* Hero and rail skeleton */}
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            <div className="h-64 animate-pulse rounded bg-neutral-200" />
            <div className="h-8 animate-pulse rounded bg-neutral-200" />
            <div className="h-20 animate-pulse rounded bg-neutral-200" />
          </div>
          <div className="space-y-4">
            <div className="h-32 animate-pulse rounded bg-neutral-200" />
            <div className="h-32 animate-pulse rounded bg-neutral-200" />
            <div className="h-32 animate-pulse rounded bg-neutral-200" />
          </div>
        </div>

        {/* Feature grid skeleton */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <div className="h-48 animate-pulse rounded bg-neutral-200" />
            <div className="h-6 animate-pulse rounded bg-neutral-200" />
          </div>
          <div className="space-y-4">
            <div className="h-48 animate-pulse rounded bg-neutral-200" />
            <div className="h-6 animate-pulse rounded bg-neutral-200" />
          </div>
          <div className="space-y-4">
            <div className="h-48 animate-pulse rounded bg-neutral-200" />
            <div className="h-6 animate-pulse rounded bg-neutral-200" />
          </div>
        </div>

        {/* Content skeleton */}
        <div className="mt-16 space-y-8">
          <div className="h-96 animate-pulse rounded bg-neutral-200" />
          <div className="h-96 animate-pulse rounded bg-neutral-200" />
        </div>
      </div>
    </div>
  );
}
