// app/api/generate/route.js
import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req) {
  try {
    const { topic, type } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    let prompt = '';
    
    if (type === 'quiz') {
      prompt = `Generate a 3-question multiple choice quiz on the topic: "${topic}".
      Return ONLY a valid JSON array of objects with this structure:
      [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "answer": "correct option exact string"
        }
      ]`;
    } else if (type === 'flashcards') {
      prompt = `Generate 4 study flashcards on the topic: "${topic}".
      Return ONLY a valid JSON array of objects with this structure:
      [
        { "front": "Concept/Question string", "back": "Detailed explanation string" }
      ]`;
    } else {
      prompt = `Provide a concise 3-bullet summary explaining: "${topic}".
      Return ONLY a valid JSON array of strings: ["bullet 1", "bullet 2", "bullet 3"]`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const data = JSON.parse(response.text);
    return NextResponse.json({ result: data });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Failed to generate AI content' }, { status: 500 });
  }
}
