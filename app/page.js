'use client';
import { useState } from 'react';

export default function Home() {
  const [syllabusText, setSyllabusText] = useState('');
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!syllabusText.trim()) return;
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ syllabusText }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to analyze syllabus');
      setSchedule(data.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadICS = () => {
    if (!schedule) return;
    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//SyllabusToSchedule AI//EN\n";
    
    schedule.forEach((item) => {
      const cleanDate = item.dueDate.replace(/-/g, '');
      icsContent += `BEGIN:VEVENT\nSUMMARY:${item.title} (${item.weight}%)\nDESCRIPTION:${item.description}\\nChecklist: ${item.subtasks.join(', ')}\nDTSTART:${cleanDate}T090000Z\nDTEND:${cleanDate}T100000Z\nEND:VEVENT\n`;
    });

    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'academic_schedule.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-12 max-w-5xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-indigo-600 mb-2">SyllabusToSchedule AI</h1>
        <p className="text-slate-600">Turn chaotic syllabi into structured calendar events & study plans instantly.</p>
      </header>

      <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 mb-8">
        <label className="block font-semibold mb-2 text-slate-700">Paste Syllabus or Course Outline Text:</label>
        <textarea
          rows={8}
          className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
          placeholder="e.g., Midterm Exam on Oct 12 worth 25%. Final Project due Dec 1st worth 40%..."
          value={syllabusText}
          onChange={(e) => setSyllabusText(e.target.value)}
        />
        <button
          onClick={handleAnalyze}
          disabled={loading || !syllabusText}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition disabled:bg-slate-300"
        >
          {loading ? 'AI Processing Syllabus...' : 'Extract Schedule & Action Plan'}
        </button>
        {error && <p className="mt-3 text-red-500 text-sm">{error}</p>}
      </div>

      {schedule && (
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-800">Extracted Milestones</h2>
            <button
              onClick={downloadICS}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg transition text-sm"
            >
              Export to .ICS Calendar
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {schedule.map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-slate-900">{item.title}</h3>
                  <span className="bg-indigo-100 text-indigo-800 text-xs px-2.5 py-1 rounded-full font-semibold">
                    {item.weight}% of grade
                  </span>
                </div>
                <p className="text-sm text-slate-500 mb-3">📅 Due: {item.dueDate}</p>
                <p className="text-sm text-slate-700 mb-3">{item.description}</p>
                <div className="border-t pt-3">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Preparation Steps:</p>
                  <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                    {item.subtasks?.map((task, i) => (
                      <li key={i}>{task}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
