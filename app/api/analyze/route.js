import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { syllabusText } = await req.json();

    if (!syllabusText) {
      return NextResponse.json({ error: 'Syllabus text is required.' }, { status: 400 });
    }

    const systemPrompt = `You are an academic organization assistant. Analyze the syllabus text and extract all major assignments, exams, and projects.
    Return STRICTLY valid JSON with no markdown block formatting or conversational text. 
    Format as an array of objects:
    [
      {
        "title": "Assignment or Exam Name",
        "dueDate": "YYYY-MM-DD",
        "weight": 20,
        "description": "Brief summary",
        "subtasks": ["Step 1", "Step 2", "Step 3"]
      }
    ]`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: `${systemPrompt}\n\nSyllabus:\n${syllabusText}` }] }
        ]
      })
    });

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '[]';
    
    const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedJSON = JSON.parse(cleanedText);

    return NextResponse.json({ result: parsedJSON });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to parse syllabus. Check format.' }, { status: 500 });
  }
}
