"use client";

import React, { useState, useEffect } from 'react';
import { MOCK_FLASHCARDS, Flashcard, VocabularyItem } from '../lib/data';
import { RotateCcw, Check, X, Layers } from 'lucide-react';

interface FlashcardDeckProps {
  customItems?: VocabularyItem[];
}

export default function FlashcardDeck({ customItems = [] }: FlashcardDeckProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [useCustom, setUseCustom] = useState(customItems.length > 0);

  // Update mode if custom items change
  useEffect(() => {
    if (customItems.length > 0) {
      setUseCustom(true);
    }
  }, [customItems.length]);

  const activeDeck = useCustom && customItems.length > 0 
    ? customItems.map(item => ({
        id: item.id,
        german: item.word,
        english: "Context / Meaning", // Placeholder as we don't have translation yet
        exampleSentence: item.context,
        mastered: false
      }))
    : MOCK_FLASHCARDS;

  const currentCard = activeDeck[currentCardIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
        setCurrentCardIndex((prev) => (prev + 1) % activeDeck.length);
    }, 200);
  };

  const toggleDeck = () => {
    setIsFlipped(false);
    setCurrentCardIndex(0);
    setUseCustom(!useCustom);
  }

  if (!currentCard) return <div className="text-center p-8">No cards available.</div>;

  return (
    <div className="flex flex-col items-center justify-center py-8">
       <div className="flex items-center justify-between w-full max-w-md mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Active Recall Trainer 🧠</h2>
          {customItems.length > 0 && (
             <button 
                onClick={toggleDeck} 
                className="text-xs flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
             >
                <Layers size={14}/> {useCustom ? 'My Words' : 'Standard Deck'}
             </button>
          )}
       </div>
      
      <div 
        className="relative w-full max-w-md h-64 cursor-pointer perspective-1000 group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front */}
          <div className="absolute w-full h-full bg-white rounded-xl shadow-xl border-2 border-gray-100 flex flex-col items-center justify-center p-8 backface-hidden">
               <span className="text-xs text-gray-400 uppercase tracking-widest mb-4">
                 {useCustom ? 'Recall Meaning' : 'German'}
               </span>
               <h3 className="text-3xl font-bold text-gray-800 text-center break-words max-w-full">{currentCard.german}</h3>
               <p className="mt-4 text-xs text-gray-300">Tap to flip</p>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full bg-slate-50 rounded-xl shadow-xl border-2 border-red-50 flex flex-col items-center justify-center p-8 rotate-y-180 backface-hidden">
              <span className="text-xs text-gray-400 uppercase tracking-widest mb-2">Context / Usage</span>
              <p className="text-lg text-gray-700 italic text-center font-serif leading-relaxed">"{currentCard.exampleSentence}"</p>
              {!useCustom && <h3 className="text-xl font-semibold text-gray-800 mt-4">{currentCard.english}</h3>}
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button 
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-3 bg-red-100 text-red-700 rounded-full font-semibold hover:bg-red-200 transition-colors shadow-sm"
        >
          <X size={20} /> Again
        </button>
        <button 
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-full font-semibold hover:bg-green-200 transition-colors shadow-sm"
        >
          <Check size={20} /> Good
        </button>
      </div>
    </div>
  );
}
