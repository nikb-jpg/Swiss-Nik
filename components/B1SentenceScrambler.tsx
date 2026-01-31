"use client";

import React, { useState, useEffect } from 'react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { B1Situation, GrammarToken } from '../types/grammar';
import B1Data from '../data/B1Coursework.json';
import { CheckCircle2, RotateCcw, HelpCircle } from 'lucide-react';

export default function B1SentenceScrambler() {
  const situations = B1Data as B1Situation[];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState<GrammarToken[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentSituation = situations[currentIndex];

  useEffect(() => {
    const shuffled = [...currentSituation.tokens].sort(() => Math.random() - 0.5);
    setItems(shuffled);
    setIsCorrect(null);
    setShowExplanation(false);
  }, [currentIndex]);

  const checkResult = () => {
    const currentOrder = items.map(i => i.id);
    const isWin = JSON.stringify(currentOrder) === JSON.stringify(currentSituation.correctSequence);
    setIsCorrect(isWin);
    if (isWin) setShowExplanation(true);
  };

  const nextTask = () => {
    setCurrentIndex((prev) => (prev + 1) % situations.length);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
      <div className="text-center mb-10">
        <div className="inline-block p-4 bg-gray-50 rounded-2xl mb-4 border border-gray-100">
            <span className="text-6xl">{currentSituation.visualPrompt}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800">Construct the sentence using "{currentSituation.connector}"</h3>
      </div>

      <div className={`relative p-8 rounded-2xl mb-8 transition-colors duration-500 ${
        currentSituation.clauseStructure === 'NEBENSATZ' 
        ? 'bg-purple-50/50 border-2 border-dashed border-purple-200' 
        : 'bg-blue-50/50 border-2 border-dashed border-blue-200'
      }`}>
        <div className="absolute -top-3 left-6 px-3 bg-white text-[10px] font-black uppercase tracking-widest text-gray-400 border border-gray-100 rounded-full">
            {currentSituation.clauseStructure} Mode
        </div>

        <Reorder.Group axis="x" values={items} onReorder={setItems} className="flex flex-wrap gap-3 justify-center items-center">
            {items.map((token) => (
                <Reorder.Item 
                    key={token.id} 
                    value={token}
                    className={`cursor-grab active:cursor-grabbing px-5 py-3 rounded-xl shadow-sm border-2 font-bold transition-all ${
                        token.type === 'VERB' 
                        ? 'bg-red-600 text-white border-red-700 shadow-red-200' 
                        : 'bg-white text-gray-800 border-gray-100'
                    }`}
                >
                    <motion.div layout>
                        {token.text}
                        <div className="text-[9px] font-light opacity-60 mt-1 uppercase tracking-tighter">
                            {token.type}
                        </div>
                    </motion.div>
                </Reorder.Item>
            ))}
        </Reorder.Group>
      </div>

      <div className="flex flex-col items-center gap-6">
        <AnimatePresence>
            {isCorrect === true && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-100 text-green-800 p-4 rounded-xl flex items-center gap-3 w-full border border-green-200"
                >
                    <CheckCircle2 className="text-green-600" />
                    <p className="text-sm font-medium">Excellent! Syntax is perfect.</p>
                </motion.div>
            )}
            {isCorrect === false && (
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-3 w-full border border-red-100"
                 >
                    <RotateCcw className="text-red-500" />
                    <p className="text-sm font-medium">Not quite. Watch the verb position!</p>
                 </motion.div>
            )}
        </AnimatePresence>

        <div className="flex gap-4 w-full">
            <button 
                onClick={checkResult}
                className="flex-1 py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95"
            >
                Check Structure
            </button>
            {isCorrect === true && (
                <button 
                    onClick={nextTask}
                    className="px-8 py-4 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg animate-bounce"
                >
                    Next 
                </button>
            )}
        </div>

        {showExplanation && (
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 w-full animate-in fade-in duration-500">
                <div className="flex items-center gap-2 mb-2 text-gray-900 font-bold uppercase text-xs">
                    <HelpCircle size={16} /> Language Logic
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic">
                    "{currentSituation.explanation}"
                </p>
            </div>
        )}
      </div>
    </div>
  );
}
