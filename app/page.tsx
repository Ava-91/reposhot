import Hero from "@/components/Hero";
import RepoShotGenerator from "@/components/RepoShotGenerator";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500 text-sm font-bold shadow-lg shadow-blue-500/20">
              R
            </div>

            <span className="text-lg font-semibold tracking-tight">
              RepoShot
            </span>
          </div>

          <span className="rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-xs font-medium text-zinc-400">
            In development
          </span>
        </nav>

        <div className="flex flex-1 flex-col items-center">
          <Hero />
          <RepoShotGenerator />
        </div>

        <footer className="border-t border-white/5 py-6 text-center text-xs text-zinc-600">
          <p>
            RepoShot · Built for showcasing the projects you&apos;re proud of.
          </p>
        </footer>
      </div>
    </main>
  );
}