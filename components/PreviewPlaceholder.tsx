export default function PreviewPlaceholder() {
  return (
    <section className="w-full pb-12 pt-20 sm:pb-16">
      <div className="mb-4 flex items-center justify-between px-1">
        <div>
          <h2 className="text-sm font-semibold text-zinc-200">Preview</h2>

          <p className="mt-1 text-xs text-zinc-500">
            Your generated RepoShot will appear here.
          </p>
        </div>

        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-500">
          1200 × 675
        </span>
      </div>

      <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-2xl shadow-black/30">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-zinc-500">
            <svg
              aria-hidden="true"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect width="18" height="14" x="3" y="5" rx="2" />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m3 16 4-4a2 2 0 0 1 3 0l2 2 2-2a2 2 0 0 1 3 0l4 4"
              />
            </svg>
          </div>

          <h3 className="text-sm font-medium text-zinc-300">
            Your RepoShot preview
          </h3>

          <p className="mt-1 max-w-sm text-xs leading-5 text-zinc-600">
            Enter a GitHub repository above to generate a screenshot.
          </p>
        </div>
      </div>
    </section>
  );
}