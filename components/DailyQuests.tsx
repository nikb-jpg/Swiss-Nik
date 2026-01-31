"use client";

import React, { useState, useEffect } from 'react';
import { Trophy, CheckCircle2, Circle, Flame } from 'lucide-react';

export type QuestTier = 'bronze' | 'silver' | 'gold';

export interface Quest {
  id: string;
  tier: QuestTier;
  title: string;
  description: string;
  xpReward: number;
  isCompleted: boolean;
}

interface DailyQuestsProps {
  onXPClaim: (amount: number) => void;
}

export default function DailyQuests({ onXPClaim }: DailyQuestsProps) {
  // Initialize with some default quests based on the "German Deep Research"
  const [quests, setQuests] = useState<Quest[]>([
    {
      id: 'q-bronze',
      tier: 'bronze',
      title: 'Vocabulary Builder',
      description: 'Save 5 new words today.',
      xpReward: 10,
      isCompleted: false,
    },
    {
      id: 'q-silver',
      tier: 'silver',
      title: 'Immersion Diver',
      description: 'Read one article from the Daily Feed.',
      xpReward: 25,
      isCompleted: false,
    },
    {
      id: 'q-gold',
      tier: 'gold',
      title: 'Grammar Gladiator',
      description: 'Write a Journal entry using the Dative case.',
      xpReward: 50,
      isCompleted: false,
    },
  ]);

  // Load quest state from local storage to persist daily progress
  useEffect(() => {
    const saved = localStorage.getItem('swiss-nik-daily-quests');
    const savedDate = localStorage.getItem('swiss-nik-quest-date');
    const today = new Date().toDateString();

    if (saved && savedDate === today) {
      setQuests(JSON.parse(saved));
    } else {
      // Reset quests if it's a new day (or first load)
      localStorage.setItem('swiss-nik-quest-date', today);
    }
  }, []);

  // Save quest state whenever it changes
  useEffect(() => {
    localStorage.setItem('swiss-nik-daily-quests', JSON.stringify(quests));
  }, [quests]);

  const handleClaim = (id: string) => {
    const quest = quests.find(q => q.id === id);
    if (quest && !quest.isCompleted) {
      onXPClaim(quest.xpReward);
      setQuests(quests.map(q => 
        q.id === id ? { ...q, isCompleted: true } : q
      ));
    }
  };

  const getTierColor = (tier: QuestTier) => {
    switch (tier) {
      case 'bronze': return 'border-orange-200 bg-orange-50 text-orange-800';
      case 'silver': return 'border-slate-300 bg-slate-50 text-slate-700';
      case 'gold': return 'border-yellow-300 bg-yellow-50 text-yellow-800';
    }
  };

  const getIconColor = (tier: QuestTier) => {
    switch (tier) {
      case 'bronze': return 'text-orange-500';
      case 'silver': return 'text-slate-500';
      case 'gold': return 'text-yellow-600';
    }
  };

  return (
    <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="text-red-500 fill-red-500" size={24} />
        <h3 className="text-xl font-bold text-gray-900">Daily Quests</h3>
        <span className="text-xs font-medium px-2 py-0.5 bg-red-100 text-red-700 rounded-full">
          Win XP
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quests.map((quest) => (
          <div 
            key={quest.id}
            onClick={() => handleClaim(quest.id)}
            className={`
              relative p-4 rounded-xl border-2 transition-all cursor-pointer select-none
              ${quest.isCompleted ? 'opacity-60 grayscale-[0.5]' : 'hover:-translate-y-1 hover:shadow-md'}
              ${getTierColor(quest.tier)}
            `}
          >
            <div className="flex justify-between items-start mb-2">
              <span className={`text-xs font-black uppercase tracking-wider ${getIconColor(quest.tier)}`}>
                {quest.tier}
              </span>
              <div className={getIconColor(quest.tier)}>
                {quest.isCompleted ? <CheckCircle2 size={20} /> : <Circle size={20} />}
              </div>
            </div>
            
            <h4 className="font-bold text-lg leading-tight mb-1">{quest.title}</h4>
            <p className="text-sm opacity-80 mb-3 min-h-[40px]">{quest.description}</p>
            
            <div className="flex items-center gap-1 text-xs font-bold">
              <Trophy size={14} />
              <span>+{quest.xpReward} XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
