"use client";

import React, { useState } from 'react';
import { MOCK_FLASHCARDS, Flashcard } from '../lib/data';
import { RotateCcw, Check, X } from 'lucide-react';

export default function FlashcardDeck() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = MOCK_FLASHCARDS[currentCardIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % MOCK_FLASHCARDS.length);
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
       <h2 className="text-2xl font-bold mb-6 text-gray-800">Active Recall Trainer 🧠</h2>
      
      <div 
        className="relative w-full max-w-md h-64 cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full duration-500 transform-style-3d transition-all ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front */}
          {!isFlipped && (
             <div className="absolute w-full h-full bg-white rounded-xl shadow-xl border-2 border-gray-100 flex flex-col items-center justify-center p-8 backface-hidden">
               <span className="text-sm text-gray-400 uppercase tracking-widest mb-4">German</span>
               <h3 className="text-3xl font-bold text-gray-800">{currentCard.german}</h3>
             </div>
          )}

          {/* Back */}
          {isFlipped && (
            <div className="absolute w-full h-full bg-slate-50 rounded-xl shadow-xl border-2 border-red-50 flex flex-col items-center justify-center p-8 rotate-y-180 backface-hidden">
              <span className="text-sm text-gray-400 uppercase tracking-widest mb-2">English</span>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{currentCard.english}</h3>
              <p className="text-gray-500 italic text-center">"{currentCard.exampleSentence}"</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button 
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-3 bg-red-100 text-red-700 rounded-full font-semibold hover:bg-red-200 transition-colors"
        >
          <X size={20} /> Still Learning
        </button>
        <button 
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-full font-semibold hover:bg-green-200 transition-colors"
        >
          <Check size={20} /> Mastered
        </button>
      </div>
    </div>
  );
}
