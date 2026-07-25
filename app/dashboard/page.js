// app/dashboard/page.js
'use client';
import { useState } from 'react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('ask-ai');

  const navItems = [
    { id: 'ask-ai', label: 'Ask AI', icon: '💬' },
    { id: 'live-ai', label: 'Live AI', icon: '🎙️' },
    { id: 'quiz', label: 'Quiz', icon: '❓' },
    { id: 'pdf', label: 'PDF Summarizer', icon: '📄' },
    { id: 'flashcards', label: 'Flashcards', icon: '🎴' },
    { id: 'assignments', label: 'Assignments', icon: '📋' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-indigo-400 p-2 mb-6">EduAI Portal</h2>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition text-left ${
                  activeTab === item.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Feature Viewport */}
      <main className="flex-1 p-6 md:p-10 max-w-5xl">
        {activeTab === 'ask-ai' && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Ask AI</h2>
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 h-80 flex items-center justify-center text-slate-500">
              Chat session viewport (connect API route)
            </div>
          </section>
        )}

        {activeTab === 'live-ai' && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Live AI Assistant</h2>
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center py-20 text-slate-400">
              Interactive real-time session module
            </div>
          </section>
        )}

        {activeTab === 'quiz' && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Interactive Quizzes</h2>
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400">
              Practice questions and instant score evaluations
            </div>
          </section>
        )}

        {activeTab === 'pdf' && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">PDF Summarizer</h2>
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400">
              Upload PDF documents for automatic note extraction
            </div>
          </section>
        )}

        {activeTab === 'flashcards' && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Flashcards</h2>
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400">
              Spaced repetition card decks
            </div>
          </section>
        )}

        {activeTab === 'assignments' && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Assignments Tracker</h2>
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400">
              Due dates, submitted work, and grading feedback
            </div>
          </section>
        )}

        {activeTab === 'profile' && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">User Profile</h2>
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400">
              Account configuration, saved preferences, and usage metrics
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
