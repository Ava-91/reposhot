export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center py-20 text-center sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl"
      />

      <div className="reposhot-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/10 bg-blue-400/6 px-4 py-2 text-sm text-blue-300 transition-colors duration-200 hover:border-blue-400/20 hover:bg-blue-400/10">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-blue-400"
        />

        Turn repositories into visuals
      </div>

      <h1 className="reposhot-fade-up reposhot-fade-up-delay max-w-4xl text-5xl font-black tracking-[-0.04em] sm:text-6xl lg:text-7xl">
        Make your GitHub
        <span className="block bg-linear-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
          look better.
        </span>
      </h1>

      <p className="reposhot-fade-up reposhot-fade-up-delay mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
        Create beautiful, shareable screenshots for your GitHub repositories.
        Paste a repository, preview the result, and make your project easier
        to showcase.
      </p>
    </section>
  );
}
