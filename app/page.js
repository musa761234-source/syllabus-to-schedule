// app/page.js
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-6 md:p-12">
      {/* Header / Navbar */}
      <header className="flex justify-between items-center max-w-6xl w-full mx-auto py-4">
        <h1 className="text-xl font-bold tracking-tight text-white">YourApp</h1>
        <nav className="flex gap-4 items-center">
          <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition">
            Sign In
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition"
          >
            Get Started
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center my-20">
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400 bg-indigo-950/60 border border-indigo-800/50 px-3 py-1 rounded-full">
          Now in Beta
        </span>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-6 mb-4 text-white leading-tight">
          Build faster with your modern workflow
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
          A brief pitch explaining what your app does, why it matters, and how it solves a core problem for your users.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-3 rounded-xl transition text-center"
          >
            Go to Dashboard
          </Link>
          <a
            href="#features"
            className="border border-slate-800 hover:border-slate-700 bg-slate-900/50 text-slate-200 font-medium px-6 py-3 rounded-xl transition text-center"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="max-w-6xl mx-auto w-full my-12">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4 font-bold">
              ⚡
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Fast Performance</h3>
            <p className="text-slate-400 text-sm">
              Server-side rendering and lightweight asset delivery for optimal speed.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4 font-bold">
              🔒
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Secure by Default</h3>
            <p className="text-slate-400 text-sm">
              Built-in data protection, identity authentication, and standard security practices.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4 font-bold">
              🎨
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Customizable</h3>
            <p className="text-slate-400 text-sm">
              Modular components designed to scale alongside your product needs.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 max-w-6xl w-full mx-auto pt-8 mt-12 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} YourApp. All rights reserved.
      </footer>
    </main>
  );
}
    
