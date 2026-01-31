"use client";

import React from 'react';
import { CheckCircle2, Circle, BookOpen, Brain, PenTool } from 'lucide-react';
import { DailyQuests as DailyQuestsType } from '../lib/data';

interface DailyQuestsProps {
  quests: DailyQuestsType;
}

export default function DailyQuests({ quests }: DailyQuestsProps) {
  const completedCount = [quests.read, quests.vocab, quests.journal].filter(Boolean).length;
  const progress = (completedCount / 3) * 100;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Today's Protocol</h3>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Goal: 7 Minutes</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-red-600">{completedCount}/3</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Quest 1: Vocab */}
        <div className={`flex items-center justify-between p-3 rounded-xl transition-all ${quests.vocab ? 'bg-green-50' : 'bg-gray-50'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${quests.vocab ? 'bg-green-100 text-green-600' : 'bg-white text-gray-400'}`}>
              <Brain size={18} />
            </div>
            <div>
              <p className={`text-sm font-bold ${quests.vocab ? 'text-green-800' : 'text-gray-700'}`}>Review Vocabulary</p>
              <p className="text-[10px] text-gray-400">SM-2 Spaced Repetition</p>
            </div>
          </div>
          {quests.vocab ? <CheckCircle2 size={20} className="text-green-500" /> : <Circle size={20} className="text-gray-200" />}
        </div>

        {/* Quest 2: Reading */}
        <div className={`flex items-center justify-between p-3 rounded-xl transition-all ${quests.read ? 'bg-green-50' : 'bg-gray-50'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${quests.read ? 'bg-green-100 text-green-600' : 'bg-white text-gray-400'}`}>
              <BookOpen size={18} />
            </div>
            <div>
              <p className={`text-sm font-bold ${quests.read ? 'text-green-800' : 'text-gray-700'}`}>Daily Immersion</p>
              <p className="text-[10px] text-gray-400">Read 1 Article</p>
            </div>
          </div>
          {quests.read ? <CheckCircle2 size={20} className="text-green-500" /> : <Circle size={20} className="text-gray-200" />}
        </div>

        {/* Quest 3: Journal */}
        <div className={`flex items-center justify-between p-3 rounded-xl transition-all ${quests.journal ? 'bg-green-50' : 'bg-gray-50'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${quests.journal ? 'bg-green-100 text-green-600' : 'bg-white text-gray-400'}`}>
              <PenTool size={18} />
            </div>
            <div>
              <p className={`text-sm font-bold ${quests.journal ? 'text-green-800' : 'text-gray-700'}`}>Active Output</p>
              <p className="text-[10px] text-gray-400">Write 1 Journal Entry</p>
            </div>
          </div>
          {quests.journal ? <CheckCircle2 size={20} className="text-green-500" /> : <Circle size={20} className="text-gray-200" />}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-red-600 transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}