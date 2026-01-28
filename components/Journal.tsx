"use client";

import React, { useState } from 'react';

export default function Journal() {
  const [entry, setEntry] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAnalyze = () => {
    // Simulating AI Feedback
    if (entry.length < 20) {
      setFeedback("⚠️ Versuch, etwas mehr zu schreiben. Detaillierte Sätze helfen beim Lernen!");
    } else {
      setFeedback("✅ Sehr gut! Dein Text fließt gut. Achte auf die Großschreibung von Nomen.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Write to Learn ✍️</h2>
      <p className="text-gray-500 mb-4">Summarize your day or describe a topic in German. Get instant feedback.</p>
      
      <textarea 
        className="w-full h-40 p-4 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none resize-none text-gray-700 bg-gray-50"
        placeholder="Heute habe ich..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      />

      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-gray-400">{entry.length} characters</span>
        <button 
          onClick={handleAnalyze}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Analyze Text
        </button>
      </div>

      {feedback && (
        <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm border border-yellow-100">
          {feedback}
        </div>
      )}
    </div>
  );
}
