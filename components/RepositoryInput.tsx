export default function RepositoryInput() {
  return (
    <section className="w-full max-w-2xl">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-2 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex min-h-12 flex-1 items-center rounded-xl border border-white/5 bg-black/20 px-4 text-left">
            <svg
              aria-hidden="true"
              className="mr-3 h-5 w-5 shrink-0 text-zinc-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6.5 17 3a4.243 4.243 0 0 1 6 6l-3.5 3.5M10.5 17.5 7 21a4.243 4.243 0 0 1-6-6l3.5-3.5m2-2 9-9m-6 15 9-9"
              />
            </svg>

            <span className="truncate text-sm text-zinc-500 sm:text-base">
              https://github.com/owner/repository
            </span>
          </div>

          <button
            type="button"
            disabled
            className="min-h-12 cursor-not-allowed rounded-xl bg-blue-500 px-6 text-sm font-semibold text-white opacity-70 transition sm:shrink-0"
          >
            Generate Shot
          </button>
        </div>
      </div>

      <p className="mt-3 text-xs text-zinc-600">
        Public GitHub repositories · PNG export
      </p>
    </section>
  );
}