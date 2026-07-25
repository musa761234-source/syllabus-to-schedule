// app/dashboard/page.js
'use client';
import { useState } from 'react';
import { 
  MessageSquare, Mic, HelpCircle, FileText, 
  Layers, BookOpen, User, Send, Upload, CheckCircle 
} from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('ask-ai');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // Helper to trigger backend AI calls for Quiz, Flashcards, and Summaries
  const handleGenerate = async (type) => {
    if (!topic) return;
    setLoading(true);
    setAiResult(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, type }),
      });
      const data = await res.json();
      setAiResult(data.result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { id: 'ask-ai', label: 'Ask AI', icon: MessageSquare },
    { id: 'live-ai', label: 'Live AI', icon: Mic },
    { id: 'quiz', label: 'Quiz Generator', icon: HelpCircle },
    { id: 'flashcards', label: 'Flashcards', icon: Layers },
    { id: 'pdf', label: 'PDF Summarizer', icon: FileText },
    { id: 'assignments', label: 'Assignments', icon: BookOpen },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col">
        <div className="text-xl font-bold text-indigo-400 p-2 mb-6 flex items-center gap-2">
          <span>🎓</span> Exam Prep AI
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setAiResult(null); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition text-left ${
                  activeTab === item.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-5xl">
        {/* ASK AI TAB */}
        {activeTab === 'ask-ai' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Ask AI Study Assistant</h2>
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask any concept (e.g. How does photosynthesis work?)"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => handleGenerate('summary')}
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
                >
                  <Send size={16} /> {loading ? 'Thinking...' : 'Ask'}
                </button>
              </div>
              {aiResult && Array.isArray(aiResult) && (
                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2 mt-4">
                  <h4 className="font-semibold text-indigo-400 text-sm">Key Insights:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-slate-300">
                    {aiResult.map((bullet, idx) => <li key={idx}>{bullet}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* LIVE AI TAB */}
        {activeTab === 'live-ai' && (
          <div className="space-y-4 text-center py-12 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="w-16 h-16 bg-indigo-600/20 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mic size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white">Live AI Audio Tutor</h2>
            <p className="text-slate-400 max-w-md mx-auto text-sm">
              Connect to interactive voice sessions to speak directly with your AI tutor.
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium text-sm transition">
              Start Voice Session
            </button>
          </div>
        )}

        {/* QUIZ GENERATOR TAB */}
        {activeTab === 'quiz' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Generate Practice Quiz</h2>
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter topic for quiz (e.g. Organic Chemistry)"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => handleGenerate('quiz')}
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
                >
                  {loading ? 'Generating...' : 'Generate Quiz'}
                </button>
              </div>

              {aiResult && Array.isArray(aiResult) && (
                <div className="space-y-4 mt-6">
                  {aiResult.map((q, idx) => (
                    <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <p className="font-medium text-white mb-3 text-sm">{idx + 1}. {q.question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {q.options?.map((opt, oIdx) => (
                          <div key={oIdx} className="p-2.5 bg-slate-900 rounded-lg text-xs text-slate-300 border border-slate-800 hover:border-indigo-500 cursor-pointer transition">
                            {opt}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* FLASHCARDS TAB */}
        {activeTab === 'flashcards' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">AI Flashcard Generator</h2>
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter subject for flashcards (e.g. World War II)"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => handleGenerate('flashcards')}
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
                >
                  {loading ? 'Creating...' : 'Create Cards'}
                </button>
              </div>

              {aiResult && Array.isArray(aiResult) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {aiResult.map((card, idx) => (
                    <div key={idx} className="p-5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between h-40">
                      <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Front</span>
                      <p className="text-sm font-medium text-white">{card.front}</p>
                      <div className="border-t border-slate-800 pt-2">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Back:</span>
                        <p className="text-xs text-slate-300 mt-1">{card.back}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* PDF TOOLS TAB */}
        {activeTab === 'pdf' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">PDF Summarizer</h2>
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 border-dashed text-center">
              <Upload className="mx-auto text-slate-500 mb-3" size={36} />
              <p className="text-sm text-slate-300 font-medium">Drag and drop your PDF study notes here</p>
              <p className="text-xs text-slate-500 mt-1">Supports files up to 10MB</p>
              <button className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-medium transition">
                Browse Files
              </button>
            </div>
          </div>
        )}

        {/* ASSIGNMENTS TAB */}
        {activeTab === 'assignments' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Assignments Tracker</h2>
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <div className="p-4 border-b border-slate-800 flex justify-between items-center text-sm font-semibold text-slate-300">
                <span>Task</span>
                <span>Status</span>
              </div>
              <div className="divide-y divide-slate-800">
                <div className="p-4 flex justify-between items-center text-sm">
                  <span className="text-white">Calculus Chapter 4 Exercises</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
                    <CheckCircle size={12} /> Submitted
                  </span>
                </div>
                <div className="p-4 flex justify-between items-center text-sm">
                  <span className="text-white">Physics Lab Report: Optics</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-amber-950 text-amber-400 border border-amber-800">
                    Pending
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Student Profile</h2>
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-xl font-bold text-white">
                  ST
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Student Account</h3>
                  <p className="text-xs text-slate-400">student@university.edu</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
