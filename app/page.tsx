"use client";

import React, { useState, useEffect } from 'react';
import ImmersionFeed from '../components/ImmersionFeed';
import DailyQuests from '../components/DailyQuests';
import FlashcardDeck from '../components/FlashcardDeck';
import Journal from '../components/Journal';
import ArticleReader from '../components/ArticleReader';
import GrammarTrainer from '../components/GrammarTrainer';
import VocabularyManager from '../components/VocabularyManager';
import BossBattle from '../components/BossBattle';
import { Article, VocabularyItem } from '../lib/data';
import { LayoutDashboard, BookOpen, PenTool, BrainCircuit, RefreshCcw, Library, Swords } from 'lucide-react';

export default function Home() {
  // State Management
  const [activeTab, setActiveTab] = useState<'immersion' | 'grammar' | 'practice' | 'vocabulary'>('immersion');
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);
  const [vocabItems, setVocabItems] = useState<VocabularyItem[]>([]);
  const [totalXP, setTotalXP] = useState(0);
  const [showBossBattle, setShowBossBattle] = useState(false);

  // Derived State for Leveling
  const currentLevel = Math.floor(totalXP / 500) + 1;
  const nextLevelXP = currentLevel * 500;
  const currentLevelXP = totalXP % 500;
  const levelProgress = (currentLevelXP / 500) * 100;

  // Load saved words and XP from localStorage on mount
  useEffect(() => {
    const storedVocab = localStorage.getItem('swiss-nik-vocab');
    if (storedVocab) {
      setVocabItems(JSON.parse(storedVocab));
    }

    const storedXP = localStorage.getItem('swiss-nik-xp');
    if (storedXP) {
      setTotalXP(parseInt(storedXP, 10));
    }
  }, []);

  // Persist Data
  useEffect(() => {
    localStorage.setItem('swiss-nik-vocab', JSON.stringify(vocabItems));
  }, [vocabItems]);

  useEffect(() => {
    localStorage.setItem('swiss-nik-xp', totalXP.toString());
  }, [totalXP]);

  const handleXPClaim = (amount: number) => {
    setTotalXP(prev => prev + amount);
  };

  const handleSaveWord = (word: string, context: string, translation?: string) => {
    // Prevent duplicates based on the word itself
    if (!vocabItems.some(v => v.word === word)) {
      const newItem: VocabularyItem = {
        id: Date.now().toString(),
        word,
        context,
        translation,
        timestamp: Date.now()
      };
      setVocabItems([newItem, ...vocabItems]);
    }
  };

  const handleRemoveWord = (id: string) => {
    setVocabItems(vocabItems.filter(v => v.id !== id));
  };

  return (
    <div className="pb-20 min-h-screen bg-gray-50/50">
      
      {/* Hero / Header */}
      <section className="text-center py-12 bg-white border-b border-gray-100 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600"></div>
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Willkommen, <span className="text-red-600">Nik</span>.
        </h2>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light mb-6">
          Daily Immersion & Active Recall System.
        </p>

        {/* Global Stats Bar */}
        <div className="max-w-xl mx-auto px-4">
          <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            <span>Level {currentLevel}</span>
            <span className="text-red-600 font-extrabold">{totalXP} XP</span>
            <span>Level {currentLevel + 1}</span>
          </div>
          <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner relative">
             <div className="absolute inset-0 bg-gray-200 w-full h-full opacity-20" style={{backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)', backgroundSize: '1rem 1rem'}}></div>
            <div 
              className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-1000 ease-out relative"
              style={{ width: `${levelProgress}%` }}
            >
            </div>
          </div>
          <div className="mt-2 text-center text-sm font-medium text-gray-600">
            {500 - currentLevelXP} XP to next level
          </div>
        </div>
      </section>

      {/* Main Navigation Tabs */}
      <div className="sticky top-0 z-40 bg-gray-50/95 backdrop-blur-sm py-4 mb-6 border-b border-gray-100/50 transition-all">
        <div className="flex justify-center px-4 overflow-x-auto">
          <div className="bg-white p-1.5 rounded-full inline-flex shadow-sm border border-gray-100 min-w-max">
            <button 
              onClick={() => setActiveTab('immersion')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeTab === 'immersion' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <LayoutDashboard size={18} /> Immersion
            </button>
            <button 
              onClick={() => setActiveTab('vocabulary')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeTab === 'vocabulary' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Library size={18} /> Vocabulary
            </button>
            <button 
              onClick={() => setActiveTab('grammar')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeTab === 'grammar' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <BrainCircuit size={18} /> Grammar
            </button>
            <button 
              onClick={() => setActiveTab('practice')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeTab === 'practice' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <PenTool size={18} /> Practice
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto max-w-6xl px-4">
        
        {/* Tab: Immersion */}
        {activeTab === 'immersion' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <DailyQuests onXPClaim={handleXPClaim} />
             
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <BookOpen className="text-red-600" /> Daily Feed
                </h3>
              </div>
              <ImmersionFeed onArticleClick={setReadingArticle} />
          </div>
        )}

        {/* Tab: Vocabulary */}
        {activeTab === 'vocabulary' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex items-center justify-between mb-8">
                <div>
                   <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <Library className="text-red-600" /> My Dictionary
                   </h3>
                   <p className="text-gray-500 text-sm">Review your saved words and their original context.</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg border border-gray-100 font-bold text-gray-700 shadow-sm">
                   {vocabItems.length} Words Saved
                </div>
              </div>
              <VocabularyManager items={vocabItems} onRemove={handleRemoveWord} />
          </div>
        )}

        {/* Tab: Grammar */}
        {activeTab === 'grammar' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Precision Grammar</h3>
              <p className="text-gray-500">Target weak points to reach C1 fluency.</p>
            </div>
            <GrammarTrainer userLevel={currentLevel} />
          </div>
        )}

        {/* Tab: Practice */}
        {activeTab === 'practice' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <FlashcardDeck customItems={vocabItems} />
              
              {/* Boss Battle Entry */}
              <div className="mt-8 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 text-white shadow-lg border border-slate-700 relative overflow-hidden group cursor-pointer" onClick={() => setShowBossBattle(true)}>
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Swords size={120} />
                  </div>
                  <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                         <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">Weekly Challenge</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-1 group-hover:text-red-400 transition-colors">Boss Battle: Case Crusher</h3>
                      <p className="text-slate-400 text-sm mb-4">Defeat the boss to prove your mastery of German cases.</p>
                      <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                          <Swords size={16} /> Enter Arena
                      </button>
                  </div>
              </div>
            </div>
            <div>
               <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <PenTool size={20} className="text-red-600"/> Output Lab
               </h3>
              <Journal />
            </div>
          </div>
        )}
      </div>

      {/* Article Reader Modal */}
      {readingArticle && (
        <ArticleReader 
          article={readingArticle} 
          onClose={() => setReadingArticle(null)} 
          onSaveWord={handleSaveWord}
        />
      )}

      {/* Boss Battle Modal */}
      {showBossBattle && (
        <BossBattle 
          onClose={() => setShowBossBattle(false)}
          onVictory={() => handleXPClaim(50)}
        />
      )}
    </div>
  );
}