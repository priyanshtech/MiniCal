import Link from "next/link";

export default function LandingBefore() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-white">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-14 backdrop-blur bg-black/60 border-b border-white/10 z-50">
        <div className="max-w-6xl mx-auto h-full flex items-center justify-between px-4">
          
          <span className="font-semibold tracking-wide">
            MiniCal
          </span>

          <Link
            href="/auth/login"
            className="px-4 py-1.5 rounded-md text-sm font-medium bg-white text-black hover:bg-neutral-200 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-xl space-y-4">
          
          <h1 className="text-4xl font-bold tracking-tight">
            Simple Calendar. Simple Tasks.
          </h1>

          <p className="text-neutral-400">
            A minimal calendar-based todo app to organize your day without distractions.
          </p>

          <div className="pt-4">
            <Link
              href="/auth/login"
              className="inline-block px-6 py-3 rounded-lg font-medium bg-white text-black hover:scale-105 transition-transform"
            >
              Start Planning
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
