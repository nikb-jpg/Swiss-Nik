"use client";

import React, { useState, useEffect } from 'react';
import ImmersionFeed from '../components/ImmersionFeed';
import FlashcardDeck from '../components/FlashcardDeck';
import Journal from '../components/Journal';
import ArticleReader from '../components/ArticleReader';
import GrammarTrainer from '../components/GrammarTrainer';
import VocabularyManager from '../components/VocabularyManager';
import B1SentenceScrambler from '../components/B1SentenceScrambler';
import DailyQuests from '../components/DailyQuests';
import { Article, VocabularyItem, DailyQuests as DailyQuestsType, calculateSM2 } from '../lib/data';
import { LayoutDashboard, BookOpen, PenTool, BrainCircuit, Library } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'immersion' | 'grammar' | 'practice' | 'vocabulary'>('immersion');
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);
  const [vocabItems, setVocabItems] = useState<VocabularyItem[]>([]);
  const [quests, setQuests] = useState<DailyQuestsType>({
    date: new Date().toISOString().split('T')[0],
    read: false,
    vocab: false,
    journal: false
  });

  // Load state from localStorage
  useEffect(() => {
    const storedVocab = localStorage.getItem('swiss-nik-vocab-v2');
    if (storedVocab) setVocabItems(JSON.parse(storedVocab));

    const storedQuests = localStorage.getItem('swiss-nik-quests');
    const today = new Date().toISOString().split('T')[0];
    if (storedQuests) {
      const parsedQuests = JSON.parse(storedQuests);
      if (parsedQuests.date === today) {
        setQuests(parsedQuests);
      }
    }
  }, []);

  // Persist state
  useEffect(() => {
    localStorage.setItem('swiss-nik-vocab-v2', JSON.stringify(vocabItems));
  }, [vocabItems]);

  useEffect(() => {
    localStorage.setItem('swiss-nik-quests', JSON.stringify(quests));
  }, [quests]);

  const handleSaveWord = (word: string, context: string) => {
    if (!vocabItems.some(v => v.word === word)) {
      const newItem: VocabularyItem = {
        id: Date.now().toString(),
        word,
        context,
        timestamp: Date.now(),
        interval: 0,
        repetition: 0,
        easiness: 2.5,
        nextReview: Date.now() // Due immediately
      };
      setVocabItems([newItem, ...vocabItems]);
    }
  };

  const handleUpdateSRS = (id: string, quality: number) => {
    setVocabItems(prev => prev.map(item => {
      if (item.id === id) {
        const result = calculateSM2(quality, item.interval, item.repetition, item.easiness);
        return { ...item, ...result };
      }
      return item;
    }));
  };

  const completeQuest = (type: keyof DailyQuestsType) => {
    if (typeof quests[type] === 'boolean') {
      setQuests(prev => ({ ...prev, [type]: true }));
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
        <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light">
          B1-C1 Precision Immersion System.
        </p>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <BookOpen className="text-red-600" /> Daily Feed
                </h3>
              </div>
              <ImmersionFeed onArticleClick={(a) => {
                setReadingArticle(a);
                completeQuest('read');
              }} />
            </div>
            <div className="space-y-6">
              <DailyQuests quests={quests} />
            </div>
          </div>
        )}

        {/* Tab: Vocabulary */}
        {activeTab === 'vocabulary' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <VocabularyManager 
                items={vocabItems} 
                onRemove={handleRemoveWord} 
                onUpdateSRS={handleUpdateSRS}
                onCompleteQuest={() => completeQuest('vocab')}
              />
          </div>
        )}

        {/* Tab: Grammar */}
        {activeTab === 'grammar' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
            <B1SentenceScrambler />
            <GrammarTrainer />
          </div>
        )}

        {/* Tab: Practice */}
        {activeTab === 'practice' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <FlashcardDeck />
            </div>
            <div>
              <Journal onComplete={() => completeQuest('journal')} />
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
    </div>
  );
}