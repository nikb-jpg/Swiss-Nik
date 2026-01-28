"use client";

import React, { useState, useEffect } from 'react';
import { Article } from '../lib/data';
import { BookOpen, Clock, RefreshCw } from 'lucide-react';

interface ImmersionFeedProps {
  onArticleClick: (article: Article) => void;
}

export default function ImmersionFeed({ onArticleClick }: ImmersionFeedProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/articles');
      const data = await res.json();
      setArticles(data);
    } catch (error) {
      console.error("Failed to load articles", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center p-10 text-gray-400">Loading fresh content...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button 
          onClick={fetchArticles}
          className="text-xs flex items-center gap-1 text-gray-500 hover:text-red-600 transition-colors"
        >
          <RefreshCw size={12} /> Refresh Feed
        </button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <div 
            key={article.id} 
            className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer flex flex-col h-full"
            onClick={() => onArticleClick(article)}
          >
            <div className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${
                  article.level === 'C1' ? 'bg-red-50 text-red-600' : 
                  article.level === 'B2' ? 'bg-orange-50 text-orange-600' : 
                  'bg-green-50 text-green-600'
                }`}>
                  {article.level}
                </span>
                <span className="text-xs text-gray-400 font-medium">{article.tags?.[0] || 'General'}</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                {article.title}
              </h3>
              
              <p className="text-gray-500 text-sm mb-6 line-clamp-3 flex-grow">
                {article.excerpt}
              </p>
              
              <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400 mt-auto">
                <span className="flex items-center gap-1"><Clock size={14}/> 3 min read</span>
                <span className="flex items-center gap-1 font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                  Read Article <BookOpen size={14}/>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
