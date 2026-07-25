import React, { useState } from 'react';

export default function StudentApp() {
  const [activeTab, setActiveTab] = useState('mcqs');

  // Dummy State Data
  const [attendance, setAttendance] = useState([
    { subject: 'Computer Science', attended: 22, total: 25 },
    { subject: 'Mathematics', attended: 18, total: 20 },
    { subject: 'Physics', attended: 14, total: 20 },
  ]);

  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Calculus Problem Set 3', due: '2026-08-01', status: 'Pending' },
    { id: 2, title: 'Database Design Document', due: '2026-08-05', status: 'In Progress' },
  ]);

  const [mcqs] = useState([
    {
      id: 1,
      question: 'Which data structure operates on a LIFO (Last In First Out) basis?',
      options: ['Queue', 'Stack', 'Array', 'Tree'],
      correct: 1,
      summary: 'A Stack pushes and pops items from the top, adhering to LIFO principles.'
    }
  ]);

  const [selectedAnswers, setSelectedAnswers] = useState({});

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-6">
      {/* App Header */}
      <header className="max-w-5xl mx-auto mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-600">🎓 StudyPulse App</h1>
        <div className="text-sm font-medium text-slate-500">Welcome, Student!</div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-5xl mx-auto mb-6 flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {['mcqs', 'attendance', 'assignments', 'summary'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition capitalize ${
              activeTab === tab
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab === 'mcqs' ? 'Practice MCQs' : tab}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto">
        {/* MCQ & Quiz Section */}
        {activeTab === 'mcqs' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Practice Multiple Choice Questions</h2>
            {mcqs.map((q) => (
              <div key={q.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <p className="font-semibold text-lg mb-4">{q.question}</p>
                <div className="grid gap-2 mb-4">
                  {q.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedAnswers({ ...selectedAnswers, [q.id]: idx })}
                      className={`p-3 rounded-lg border text-left text-sm font-medium transition ${
                        selectedAnswers[q.id] === idx
                          ? idx === q.correct
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-800'
                            : 'bg-rose-100 border-rose-500 text-rose-800'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {selectedAnswers[q.id] !== undefined && (
                  <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-sm text-indigo-900">
                    <strong>Topic Summary:</strong> {q.summary}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Attendance Tracker */}
        {activeTab === 'attendance' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-4">Attendance Overview</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {attendance.map((item, idx) => {
                const percentage = Math.round((item.attended / item.total) * 100);
                return (
                  <div key={idx} className="p-4 border rounded-lg bg-slate-50">
                    <h3 className="font-bold text-slate-800">{item.subject}</h3>
                    <p className="text-2xl font-extrabold text-indigo-600 my-2">{percentage}%</p>
                    <p className="text-xs text-slate-500">
                      Attended {item.attended} out of {item.total} classes
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Assignments Section */}
        {activeTab === 'assignments' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-4">Upcoming Assignments</h2>
            <div className="divide-y">
              {assignments.map((item) => (
                <div key={item.id} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-xs text-slate-500">Due: {item.due}</p>
                  </div>
                  <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-medium">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Practice Summary */}
        {activeTab === 'summary' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-2">Subject Quick Summaries</h2>
            <p className="text-sm text-slate-600 mb-4">
              Review concise notes and key formulas generated for your active courses.
            </p>
            <blockquote className="border-l-4 border-indigo-500 pl-4 py-2 bg-slate-50 text-sm italic">
              "Data Structures: Stacks use LIFO, Queues use FIFO. Trees are non-linear hierarchical structures used for quick searches."
            </blockquote>
          </div>
        )}
      </main>
    </div>
  );
}
