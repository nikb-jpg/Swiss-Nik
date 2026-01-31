"use client";

import React, { useState } from 'react';
import { Skull, Sword, Trophy, X } from 'lucide-react';

interface BossBattleProps {
  onClose: () => void;
  onVictory: () => void;
}

export default function BossBattle({ onClose, onVictory }: BossBattleProps) {
  const [stage, setStage] = useState<'intro' | 'fight' | 'victory' | 'defeat'>('intro');
  const [answer, setAnswer] = useState('');

  // Mock Boss Data
  const boss = {
      name: "The Case Crusher",
      description: "A dragon that devours those who misuse the Accusative case.",
      hp: 100,
      question: "Translate: 'The man sees the dog.' (Pay attention to the Accusative case!)",
      correctAnswer: "Der Mann sieht den Hund"
  };

  const handleAttack = () => {
      // Simple string normalization for checking
      if (answer.trim().toLowerCase() === boss.correctAnswer.toLowerCase() || 
          answer.trim().toLowerCase() === "der mann sieht den hund.") {
          setStage('victory');
      } else {
          setStage('defeat');
      }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-slate-900 border-2 border-slate-700 text-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
            <X size={24} />
        </button>

        {stage === 'intro' && (
            <div className="p-8 text-center">
                <div className="w-24 h-24 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-red-600 animate-pulse">
                    <Skull size={48} className="text-red-500" />
                </div>
                <h2 className="text-3xl font-black text-red-500 mb-2 uppercase tracking-widest">Boss Battle</h2>
                <h3 className="text-xl font-bold text-white mb-4">{boss.name}</h3>
                <p className="text-slate-400 mb-8">{boss.description}</p>
                <button 
                    onClick={() => setStage('fight')}
                    className="w-full py-4 bg-red-600 hover:bg-red-700 rounded-lg font-bold text-lg uppercase tracking-wide transition-all transform hover:scale-105"
                >
                    Challenge Boss
                </button>
            </div>
        )}

        {stage === 'fight' && (
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <div className="text-red-500 font-bold flex items-center gap-2">
                        <Skull size={20} /> {boss.name}
                    </div>
                    <div className="w-1/2 h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-600">
                        <div className="w-full h-full bg-red-600"></div>
                    </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-xl border border-slate-600 mb-6">
                    <p className="text-lg font-medium text-slate-200">{boss.question}</p>
                </div>

                <input 
                    type="text" 
                    placeholder="Type your translation..."
                    className="w-full p-4 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-red-500 mb-4"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    autoFocus
                />

                <button 
                    onClick={handleAttack}
                    className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
                >
                    <Sword size={20} /> Strike!
                </button>
            </div>
        )}

        {stage === 'victory' && (
            <div className="p-8 text-center animate-in zoom-in duration-300">
                <div className="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-yellow-500">
                    <Trophy size={48} className="text-yellow-500" />
                </div>
                <h2 className="text-3xl font-black text-yellow-500 mb-4 uppercase">Victory!</h2>
                <p className="text-slate-300 mb-8">You defeated {boss.name} and proved your mastery.</p>
                <button 
                    onClick={() => { onVictory(); onClose(); }}
                    className="w-full py-4 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-bold text-lg uppercase tracking-wide text-black"
                >
                    Claim +50 XP Reward
                </button>
            </div>
        )}

        {stage === 'defeat' && (
            <div className="p-8 text-center animate-in shake duration-300">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-gray-600">
                    <X size={48} className="text-gray-500" />
                </div>
                <h2 className="text-3xl font-black text-gray-500 mb-4 uppercase">Defeated...</h2>
                <p className="text-slate-400 mb-2">That was not correct.</p>
                <p className="text-red-400 font-mono text-sm mb-8">Expected: "{boss.correctAnswer}"</p>
                <button 
                    onClick={() => setStage('fight')}
                    className="w-full py-4 bg-slate-700 hover:bg-slate-600 rounded-lg font-bold text-lg uppercase tracking-wide"
                >
                    Try Again
                </button>
            </div>
        )}

      </div>
    </div>
  );
}