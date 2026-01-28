"use client";

import React from 'react';
import { Trash2, Volume2 } from 'lucide-react';

interface SavedWordsListProps {
  words: string[];
  onRemove: (word: string) => void;
}

export default function SavedWordsList({ words, onRemove }: SavedWordsListProps) {
  if (words.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
        <p className="text-gray-400">No saved words yet.</p>
        <p className="text-xs text-gray-400 mt-1">Read articles and highlight text to save.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <h3 className="font-bold text-gray-800">My Vocabulary ({words.length})</h3>
      </div>
      <ul className="divide-y divide-gray-100 max-h-[300px] overflow-y-auto">
        {words.map((word, idx) => (
          <li key={idx} className="p-4 flex justify-between items-center hover:bg-gray-50 group transition-colors">
            <span className="font-medium text-gray-800 text-lg">{word}</span>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50" title="Listen (Mock)">
                <Volume2 size={16} />
              </button>
              <button 
                onClick={() => onRemove(word)}
                className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50" 
                title="Remove"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
