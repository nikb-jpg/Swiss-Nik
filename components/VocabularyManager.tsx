"use client";

import React, { useState } from 'react';
import { VocabularyItem } from '../lib/data';
import { Trash2, Search, Volume2, Calendar } from 'lucide-react';

interface VocabularyManagerProps {
  items: VocabularyItem[];
  onRemove: (id: string) => void;
}

export default function VocabularyManager({ items, onRemove }: VocabularyManagerProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter(item => 
    item.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.context.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (items.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
        <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
           <Search className="text-red-500" size={32} />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">No words saved yet</h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          Go to the Immersion tab, read an article, and highlight words to build your personal dictionary.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-red-100 hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-2xl font-bold text-gray-900">{item.word}</h3>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors" title="Pronounce">
                  <Volume2 size={18} />
                </button>
                <button 
                  onClick={() => onRemove(item.id)}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors" 
                  title="Remove"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-red-500 mb-3">
              {item.translation && (
                  <p className="text-sm font-bold text-gray-800 mb-1 border-b border-gray-200 pb-1">
                    {item.translation}
                  </p>
              )}
              <p className="text-gray-700 italic font-serif">"{item.context}"</p>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Calendar size={12} />
              <span>Saved on {new Date(item.timestamp).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
