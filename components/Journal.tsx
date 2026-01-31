"use client";

import React, { useState, useEffect } from 'react';
import { Trash2, Save } from 'lucide-react';

export default function Journal() {
  const [entry, setEntry] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('swiss-nik-journal');
    if (saved) setEntry(saved);
  }, []);

  const handleSave = () => {
    localStorage.setItem('swiss-nik-journal', entry);
    // Visual feedback could be added here
  };

  const handleClear = () => {
    if(confirm("Are you sure you want to clear your journal?")) {
        setEntry("");
        setFeedback(null);
        localStorage.removeItem('swiss-nik-journal');
    }
  }

  const handleAnalyze = () => {
    handleSave(); // Auto-save on analyze
    // Simulating AI Feedback
    if (entry.length < 20) {
      setFeedback("⚠️ Versuch, etwas mehr zu schreiben. Detaillierte Sätze helfen beim Lernen!");
    } else {
      setFeedback("✅ Sehr gut! Dein Text fließt gut. Achte auf die Großschreibung von Nomen.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
            <h2 className="text-2xl font-bold text-gray-800">Write to Learn ✍️</h2>
            <p className="text-gray-500 text-sm">Summarize your day or describe a topic in German.</p>
        </div>
        <button onClick={handleClear} className="text-gray-400 hover:text-red-600 transition-colors" title="Clear Journal">
            <Trash2 size={18} />
        </button>
      </div>
      
      <textarea 
        className="w-full flex-grow min-h-[160px] p-4 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none resize-none text-gray-700 bg-gray-50 mb-4"
        placeholder="Heute habe ich..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        onBlur={handleSave}
      />

      <div className="flex justify-between items-center mt-auto">
        <span className="text-xs text-gray-400">{entry.length} characters</span>
        <button 
          onClick={handleAnalyze}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors shadow-sm"
        >
          Analyze Text
        </button>
      </div>

      {feedback && (
        <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm border border-yellow-100 animate-in fade-in slide-in-from-top-2">
          {feedback}
        </div>
      )}
    </div>
  );
}
