import WorkspaceBuilder from "@/components/WorkspaceBuilder";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between">
      {/* Header / Navbar */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
              monis.rent
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Bali Workspace Configurator
            </span>
          </div>
          <p className="text-xs text-slate-400 hidden sm:block">
            Design your setup & get it delivered to your villa or office
          </p>
        </div>
      </header>

      {/* Main Interactive Builder */}
      <section className="flex-1 py-4">
        <WorkspaceBuilder />
      </section>

      {/* Footer minimalis */}
      <footer className="border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        © 2026 Monis Rent. Built for nomads and remote workers in Bali.
      </footer>
    </main>
  );
}
