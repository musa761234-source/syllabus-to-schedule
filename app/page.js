// app/page.js
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight text-indigo-400">EduAI App</h1>
          <nav className="flex items-center gap-6 text-sm text-slate-300">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
            <Link
              href="/login"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center px-6 py-20">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
          Supercharge Your Learning with AI
        </h2>
        <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
          Generate quizzes, interactive flashcards, summary insights, and live AI guidance directly from your study materials.
        </p>
        <Link
          href="/login"
          className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-lg px-8 py-4 rounded-xl transition shadow-lg shadow-indigo-600/20"
        >
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-16">
        <h3 className="text-2xl font-bold text-center text-white mb-12">Core Features</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-2xl mb-3">💬</div>
            <h4 className="text-lg font-semibold text-white mb-2">Ask AI & Live AI</h4>
            <p className="text-sm text-slate-400">Get instant answers to complex topics or converse live with an AI tutor.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-2xl mb-3">📝</div>
            <h4 className="text-lg font-semibold text-white mb-2">Quizzes & Flashcards</h4>
            <p className="text-sm text-slate-400">Automatically generate study quizzes and flashcard sets from your notes or PDFs.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-2xl mb-3">📄</div>
            <h4 className="text-lg font-semibold text-white mb-2">PDF & Assignments</h4>
            <p className="text-sm text-slate-400">Upload PDFs to extract summaries and track assigned homework in one unified dashboard.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-xl mx-auto px-6 py-16 w-full">
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Contact Us</h3>
          <p className="text-slate-400 text-sm mb-6">Have questions or feedback? Drop us a message.</p>
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
            />
            <textarea
              placeholder="Your message"
              rows={3}
              className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
            />
            <button
              type="button"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-lg transition text-sm"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} EduAI App. All rights reserved.
      </footer>
    </div>
  );
}
