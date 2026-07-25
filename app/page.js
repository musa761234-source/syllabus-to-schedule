'use client';

import React, { useState } from 'react';

export default function StudentHubApp() {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: 'Alex Johnson', email: 'alex@student.edu' });
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Active Tab State
  const [activeTab, setActiveTab] = useState('mcqs');

  // Application Data States
  const [summaries, setSummaries] = useState([
    {
      id: 1,
      title: 'Data Structures Quick Summary',
      subject: 'Computer Science',
      uploadedBy: 'Prof. Smith',
      content: 'Stacks operate on Last-In-First-Out (LIFO). Queues operate on First-In-First-Out (FIFO). Trees provide hierarchical lookup efficiencies.',
      date: '2026-07-20'
    },
    {
      id: 2,
      title: 'Calculus Derivatives Cheat Sheet',
      subject: 'Mathematics',
      uploadedBy: 'Sarah K.',
      content: 'Power Rule: d/dx [x^n] = n*x^(n-1). Product Rule: (uv)\' = u\'v + uv\'. Chain Rule applies to composite functions.',
      date: '2026-07-22'
    }
  ]);

  const [newSummaryTitle, setNewSummaryTitle] = useState('');
  const [newSummarySubject, setNewSummarySubject] = useState('');
  const [newSummaryContent, setNewSummaryContent] = useState('');

  const [mcqs] = useState([
    {
      id: 1,
      subject: 'Computer Science',
      question: 'Which data structure operates strictly on a LIFO (Last In First Out) basis?',
      options: ['Queue', 'Stack', 'Linked List', 'Binary Tree'],
      correct: 1,
      explanation: 'A Stack processes the most recently added item first, making it a LIFO structure.'
    },
    {
      id: 2,
      subject: 'Mathematics',
      question: 'What is the derivative of x^2 with respect to x?',
      options: ['x', '2x', '2', 'x^3'],
      correct: 1,
      explanation: 'Using the power rule: d/dx(x^n) = n*x^(n-1), so d/dx(x^2) = 2*x^(2-1) = 2x.'
    }
  ]);

  const [selectedAnswers, setSelectedAnswers] = useState({});

  const [assignments] = useState([
    { id: 1, title: 'Algorithm Complexity Essay', subject: 'Computer Science', due: '2026-08-01', status: 'Pending' },
    { id: 2, title: 'Calculus Problem Set 4', subject: 'Mathematics', due: '2026-08-04', status: 'In Progress' },
    { id: 3, title: 'Physics Lab Report', subject: 'Physics', due: '2026-08-10', status: 'Submitted' }
  ]);

  const [attendance] = useState([
    { subject: 'Computer Science', attended: 22, total: 25 },
    { subject: 'Mathematics', attended: 18, total: 20 },
    { subject: 'Physics', attended: 15, total: 20 }
  ]);

  // Upload handler
  const handleAddSummary = (e) => {
    e.preventDefault();
    if (!newSummaryTitle || !newSummaryContent) return;

    const newItem = {
      id: Date.now(),
      title: newSummaryTitle,
      subject: newSummarySubject || 'General',
      uploadedBy: user.name,
      content: newSummaryContent,
      date: new Date().toISOString().split('T')[0]
    };

    setSummaries([newItem, ...summaries]);
    setNewSummaryTitle('');
    setNewSummarySubject('');
    setNewSummaryContent('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-12">
      {/* Top Navigation Banner */}
      <header className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 shadow-lg p-4 border-b border-indigo-400/20">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🚀</span>
            <h1 className="text-2xl font-black tracking-wide text-white drop-shadow">
              StudyPulse AI
            </h1>
          </div>

          <div>
            {isLoggedIn ? (
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-sm font-semibold text-white">{user.name}</span>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="text-xs bg-rose-500 hover:bg-rose-600 text-white px-2.5 py-1 rounded-md transition font-medium ml-2"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-sm px-5 py-2 rounded-full shadow-md transition transform active:scale-95"
              >
                Log In / Register
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        {/* Colorful Navigation Tabs */}
        <nav className="flex gap-2 overflow-x-auto pb-3 mb-8 border-b border-slate-800">
          {[
            { id: 'mcqs', label: '🎯 Practice MCQs', color: 'from-amber-500 to-orange-500' },
            { id: 'summaries', label: '📚 Upload & Notes', color: 'from-emerald-500 to-teal-500' },
            { id: 'assignments', label: '📝 Assignments', color: 'from-pink-500 to-rose-500' },
            { id: 'attendance', label: '📊 Attendance', color: 'from-cyan-500 to-blue-500' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap shadow-sm ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105`
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Tab 1: MCQs & Practice Quizzes */}
        {activeTab === 'mcqs' && (
          <section className="space-y-6">
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-6 rounded-2xl border border-amber-500/20">
              <h2 className="text-2xl font-bold text-amber-400">Interactive Practice & Quiz Center</h2>
              <p className="text-slate-400 text-sm mt-1">Select an answer to reveal instant detailed feedback and explanations.</p>
            </div>

            <div className="grid gap-6">
              {mcqs.map((q) => (
                <div key={q.id} className="bg-slate-800/90 border border-slate-700 p-6 rounded-2xl shadow-xl">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {q.subject}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-4">{q.question}</h3>

                  <div className="grid gap-2.5 mb-4">
                    {q.options.map((opt, idx) => {
                      const isSelected = selectedAnswers[q.id] === idx;
                      const isCorrect = idx === q.correct;
                      let btnStyle = 'bg-slate-700/60 border-slate-600 text-slate-200 hover:bg-slate-700';

                      if (selectedAnswers[q.id] !== undefined) {
                        if (isSelected) {
                          btnStyle = isCorrect
                            ? 'bg-emerald-600/30 border-emerald-500 text-emerald-200'
                            : 'bg-rose-600/30 border-rose-500 text-rose-200';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedAnswers({ ...selectedAnswers, [q.id]: idx })}
                          className={`p-3.5 rounded-xl border text-left text-sm font-medium transition-all ${btnStyle}`}
                        >
                          <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + idx)}.</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {selectedAnswers[q.id] !== undefined && (
                    <div className="p-4 bg-slate-900/80 border border-indigo-500/30 rounded-xl text-sm text-indigo-200 animate-fadeIn">
                      <strong className="text-indigo-400">Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 2: Summaries & Upload Study Notes */}
        {activeTab === 'summaries' && (
          <section className="grid lg:grid-cols-3 gap-8">
            {/* Upload Form */}
            <div className="lg:col-span-1 bg-slate-800/90 border border-slate-700 p-6 rounded-2xl shadow-xl h-fit">
              <h2 className="text-xl font-bold text-teal-400 mb-1">Upload Study Material</h2>
              <p className="text-xs text-slate-400 mb-4">Share study guides, summaries, or notes.</p>

              <form onSubmit={handleAddSummary} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Topic / Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Organic Chemistry Rules"
                    value={newSummaryTitle}
                    onChange={(e) => setNewSummaryTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Chemistry"
                    value={newSummarySubject}
                    onChange={(e) => setNewSummarySubject(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Summary / Notes</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Paste key notes, formulas, or study material here..."
                    value={newSummaryContent}
                    onChange={(e) => setNewSummaryContent(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-teal-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-sm py-3 rounded-xl transition shadow-lg"
                >
                  Upload & Share
                </button>
              </form>
            </div>

            {/* Uploaded Summaries List */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold text-teal-400">Available Study Summaries</h2>
              {summaries.map((s) => (
                <div key={s.id} className="bg-slate-800/90 border border-slate-700 p-6 rounded-2xl shadow-xl">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-white">{s.title}</h3>
                      <p className="text-xs text-teal-400 font-medium">Subject: {s.subject}</p>
                    </div>
                    <span className="text-xs bg-slate-700 text-slate-300 px-2.5 py-1 rounded-md">
                      {s.date}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 mt-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    {s.content}
                  </p>
                  <p className="text-xs text-slate-500 mt-3">Uploaded by: <span className="text-slate-400 font-medium">{s.uploadedBy}</span></p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 3: Assignments */}
        {activeTab === 'assignments' && (
          <section className="space-y-6">
            <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 p-6 rounded-2xl border border-pink-500/20">
              <h2 className="text-2xl font-bold text-pink-400">Assignments & Homework Tracker</h2>
              <p className="text-slate-400 text-sm mt-1">Keep track of pending submissions and target deadlines.</p>
            </div>

            <div className="grid gap-4">
              {assignments.map((item) => (
                <div key={item.id} className="bg-slate-800/90 border border-slate-700 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-xs font-bold text-pink-400 bg-pink-500/10 px-2.5 py-0.5 rounded border border-pink-500/20">
                      {item.subject}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">{item.title}</h3>
                    <p className="text-xs text-slate-400">Due Date: {item.due}</p>
                  </div>

                  <span
                    className={`text-xs px-3 py-1.5 rounded-full font-bold border ${
                      item.status === 'Submitted'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : item.status === 'In Progress'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 4: Attendance */}
        {activeTab === 'attendance' && (
          <section className="space-y-6">
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-6 rounded-2xl border border-cyan-500/20">
              <h2 className="text-2xl font-bold text-cyan-400">Course Attendance Stats</h2>
              <p className="text-slate-400 text-sm mt-1">Overview of your logged classes across enrolled subjects.</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {attendance.map((item, idx) => {
                const percentage = Math.round((item.attended / item.total) * 100);
                return (
                  <div key={idx} className="bg-slate-800/90 border border-slate-700 p-6 rounded-2xl text-center shadow-xl">
                    <h3 className="text-lg font-bold text-white mb-2">{item.subject}</h3>
                    <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 my-2">
                      {percentage}%
                    </div>
                    <p className="text-xs text-slate-400">
                      Attended {item.attended} of {item.total} lectures
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* Login / Register Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-white mb-1">Student Portal Login</h3>
            <p className="text-xs text-slate-400 mb-4">Enter your details to log in.</p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                onClick={() => {
                  setIsLoggedIn(true);
                  setShowLoginModal(false);
                }}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm py-2.5 rounded-xl transition shadow-lg mt-2"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
