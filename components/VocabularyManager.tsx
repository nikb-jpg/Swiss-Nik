"use client";

import React, { useState } from 'react';
import { VocabularyItem, calculateSM2 } from '../lib/data';
import { Trash2, Search, Volume2, Calendar, Play, CheckCircle2, ChevronRight } from 'lucide-react';

interface VocabularyManagerProps {
  items: VocabularyItem[];
  onRemove: (id: string) => void;
  onUpdateSRS: (id: string, quality: number) => void;
  onCompleteQuest: () => void;
}

export default function VocabularyManager({ items, onRemove, onUpdateSRS, onCompleteQuest }: VocabularyManagerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [studyMode, setStudyMode] = useState(false);
  const [currentStudyIndex, setCurrentStudyIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Filter items due for review
  const dueItems = items.filter(item => item.nextReview <= Date.now());
  const filteredItems = items.filter(item => 
    item.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.context.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startStudy = () => {
    if (dueItems.length > 0) {
      setStudyMode(true);
      setCurrentStudyIndex(0);
      setShowAnswer(false);
    }
  };

  const handleRate = (quality: number) => {
    onUpdateSRS(dueItems[currentStudyIndex].id, quality);
    if (currentStudyIndex + 1 < dueItems.length) {
      setCurrentStudyIndex(currentStudyIndex + 1);
      setShowAnswer(false);
    } else {
      setStudyMode(false);
      onCompleteQuest();
    }
  };

  if (studyMode) {
    const currentItem = dueItems[currentStudyIndex];
    return (
      <div className="max-w-2xl mx-auto animate-in fade-in zoom-in duration-300">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gray-900 p-4 text-white flex justify-between items-center px-8">
            <span className="text-xs font-bold uppercase tracking-widest">SRS Session</span>
            <span className="text-xs font-bold">{currentStudyIndex + 1} / {dueItems.length}</span>
          </div>
          
          <div className="p-12 text-center">
            <h3 className="text-5xl font-black text-gray-900 mb-8">{currentItem.word}</h3>
            
            {!showAnswer ? (
              <button 
                onClick={() => setShowAnswer(true)}
                className="px-10 py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg"
              >
                Show Context & Answer
              </button>
            ) : (
              <div className="animate-in slide-in-from-bottom-4 duration-300">
                <div className="bg-gray-50 p-6 rounded-2xl border-l-4 border-red-500 mb-8 italic text-lg text-gray-700 font-serif">
                  "{currentItem.context}"
                </div>
                
                <p className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">How well did you know this?</p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((q) => (
                    <button
                      key={q}
                      onClick={() => handleRate(q)}
                      className={`w-12 h-12 rounded-xl font-bold transition-all ${
                        q <= 2 ? 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white' :
                        q === 3 ? 'bg-orange-50 text-orange-600 hover:bg-orange-600 hover:text-white' :
                        'bg-green-50 text-green-600 hover:bg-green-600 hover:text-white'
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-6 text-[10px] font-bold text-gray-400 uppercase px-2">
                  <span>Forgot</span>
                  <span>Perfect</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* SRS Header */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-lg border border-gray-700">
        <div>
          <h3 className="text-2xl font-bold mb-1">Spaced Repetition</h3>
          <p className="text-gray-400 text-sm">
            {dueItems.length > 0 
              ? `You have ${dueItems.length} words due for review today.` 
              : "All caught up! No words due for review."}
          </p>
        </div>
        {dueItems.length > 0 && (
          <button 
            onClick={startStudy}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl hover:scale-105 active:scale-95"
          >
            <Play size={20} fill="currentColor"/> Start Session
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search your vocabulary..." 
          className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none transition-all shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      </div>

      {/* Grid of Words */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const isDue = item.nextReview <= Date.now();
          return (
            <div key={item.id} className={`bg-white p-6 rounded-xl shadow-sm border transition-all group ${isDue ? 'border-red-200 ring-1 ring-red-100' : 'border-gray-100'}`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{item.word}</h3>
                  {isDue && <span className="text-[9px] font-black text-red-600 uppercase tracking-tighter bg-red-50 px-1.5 py-0.5 rounded">Due Now</span>}
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                    <Volume2 size={14} />
                  </button>
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors" 
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg border-l-2 border-red-500 mb-3">
                <p className="text-xs text-gray-600 italic font-serif line-clamp-2">"{item.context}"</p>
              </div>

              <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase">
                <div className="flex items-center gap-1">
                  <Calendar size={10} />
                  <span>Next: {new Date(item.nextReview).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1 text-red-600/50">
                  <ChevronRight size={10} />
                  <span>EF {item.easiness.toFixed(1)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}