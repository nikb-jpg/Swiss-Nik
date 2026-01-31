"use client";

import React, { useState } from 'react';

interface JournalProps {
  onComplete?: () => void;
}

export default function Journal({ onComplete }: JournalProps) {
  const [entry, setEntry] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAnalyze = () => {
    // Simulating AI Feedback
    if (entry.length < 20) {
      setFeedback("⚠️ Versuch, etwas mehr zu schreiben. Detaillierte Sätze helfen beim Lernen!");
    } else {
      setFeedback("✅ Sehr gut! Dein Text fließt gut. Achte auf die Großschreibung von Nomen.");
      if (onComplete) onComplete();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Output Lab ✍️</h2>
      <p className="text-gray-500 mb-6 text-sm italic">Summarize your day or describe a topic in German. Aim for at least 2 sentences.</p>
      
      <textarea 
        className="w-full h-48 p-6 border-2 border-gray-50 rounded-2xl focus:ring-4 focus:ring-red-50 focus:border-red-500 focus:outline-none resize-none text-lg text-gray-700 bg-gray-50/50 transition-all font-serif"
        placeholder="Heute habe ich..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      />

      <div className="flex justify-between items-center mt-6">
        <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">{entry.length} characters</span>
        <button 
          onClick={handleAnalyze}
          className="bg-gray-900 hover:bg-black text-white font-black uppercase tracking-widest py-3 px-8 rounded-2xl transition-all shadow-lg active:scale-95"
        >
          Analyze Output
        </button>
      </div>

      {feedback && (
        <div className="mt-6 p-4 bg-red-50 text-red-800 rounded-xl text-sm border border-red-100 animate-in fade-in slide-in-from-top-2">
          {feedback}
        </div>
      )}
    </div>
  );
}