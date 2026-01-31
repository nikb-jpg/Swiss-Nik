"use client";

import React, { useState } from 'react';
import { Article } from '../lib/data';
import { X, Plus, BookOpen } from 'lucide-react';

interface ArticleReaderProps {
  article: Article;
  onClose: () => void;
  onSaveWord: (word: string, context: string) => void;
}

export default function ArticleReader({ article, onClose, onSaveWord }: ArticleReaderProps) {
  const [selectedText, setSelectedText] = useState("");
  const [detectedContext, setDetectedContext] = useState("");

  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (!selection || selection.toString().trim().length === 0) {
      setSelectedText("");
      setDetectedContext("");
      return;
    }

    const text = selection.toString().trim();
    setSelectedText(text);

    if (selection.anchorNode && selection.anchorNode.textContent) {
      const fullPara = selection.anchorNode.textContent;
      // Regex to split sentences roughly
      const sentences = fullPara.match(/[^\.!\?]+[\.!?]+/g) || [fullPara];
      
      const matchingSentence = sentences.find(s => s.includes(text));
      if (matchingSentence) {
        setDetectedContext(matchingSentence.trim());
      } else {
        setDetectedContext(text);
      }
    }
  };

  const handleSaveSelection = () => {
    if (selectedText) {
      onSaveWord(selectedText, detectedContext);
      setSelectedText(""); 
      setDetectedContext("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col animate-in fade-in zoom-in duration-200">
        
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{article.title}</h2>
            <div className="flex gap-2 mt-2">
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${ 
                  article.level === 'C1' ? 'bg-red-100 text-red-700' : 
                  article.level === 'B2' ? 'bg-orange-100 text-orange-700' : 
                  'bg-green-100 text-green-700'
                }
              `}>
                  {article.level}
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <BookOpen size={12} /> {article.tags?.join(", ")}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div 
          className="p-8 overflow-y-auto leading-relaxed text-lg text-gray-700 font-serif"
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
        >
          {article.content.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4 whitespace-pre-line selection:bg-red-200 selection:text-red-900">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl min-h-[80px] flex items-center justify-center">
          {!selectedText ? (
            <p className="text-sm text-gray-400 italic flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
              Highlight any word to save it with context.
            </p>
          ) : (
            <div className="w-full flex justify-between items-center animate-in slide-in-from-bottom-2">
              <div className="flex-1 mr-4">
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Context Preview:</p>
                 <p className="text-sm text-gray-700 italic border-l-2 border-red-300 pl-2 line-clamp-2">
                   "{detectedContext}"
                 </p>
              </div>
              <button 
                onClick={handleSaveSelection}
                className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Plus size={18} />
                Save "{selectedText}"
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
