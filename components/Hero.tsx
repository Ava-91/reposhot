export default function Hero() {
  return (
    <section className="w-full max-w-5xl pb-10 pt-16 sm:pb-12 sm:pt-20">
      <div className="reposhot-fade-up border-l-2 border-emerald-400 pl-4 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">GitHub repository → shareable snapshot</div>
      <div className="reposhot-fade-up reposhot-fade-up-delay mt-7 grid gap-8 lg:grid-cols-[1fr_280px] lg:items-end">
        <div>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">Show the repo.<br /><span className="text-zinc-500">Not the dashboard.</span></h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">Turn a public GitHub repository into a clean image you can actually post, share, or drop into a portfolio.</p>
        </div>
        <div className="border-t border-white/10 pt-4 font-mono text-[11px] leading-5 text-zinc-500 lg:border-l lg:border-t-0 lg:pl-5"><p className="text-zinc-300">No account.</p><p>No fake engagement metrics.</p><p>No decorative AI fog.</p></div>
      </div>
    </section>
  );
}
