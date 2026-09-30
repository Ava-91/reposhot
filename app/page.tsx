import Hero from "@/components/Hero";
import RepoShotGenerator from "@/components/RepoShotGenerator";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0c0e] text-[#f3f4f6]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between border-b border-white/10 py-5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold tracking-tight text-white">R/</span>
            <span className="text-sm font-semibold tracking-tight">RepoShot</span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400">in development</span>
        </nav>
        <div className="flex flex-1 flex-col items-center"><Hero /><RepoShotGenerator /></div>
        <footer className="mt-16 border-t border-white/10 py-5 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-400">RepoShot · repository snapshots for people who build things</footer>
      </div>
    </main>
  );
}
