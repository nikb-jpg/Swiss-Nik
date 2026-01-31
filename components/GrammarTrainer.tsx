"use client";

import React, { useState } from 'react';
import { GRAMMAR_QUESTIONS, GrammarQuestion } from '../lib/data';
import { CheckCircle2, XCircle, ArrowRight, Lock, Play, Star } from 'lucide-react';

interface GrammarTrainerProps {
    userLevel?: number;
}

export default function GrammarTrainer({ userLevel = 1 }: GrammarTrainerProps) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Define Skill Tree Nodes
  const skillNodes = [
      { id: 't1', title: 'Level 1: Present Tense', reqLevel: 1, desc: 'Basic sentence structure & verbs.' },
      { id: 't2', title: 'Level 2: Case System', reqLevel: 2, desc: 'Nominative vs Accusative mastery.' },
      { id: 't3', title: 'Level 3: Dative & Preps', reqLevel: 3, desc: 'Indirect objects and two-way prepositions.' },
      { id: 't4', title: 'Level 4: Past Tense', reqLevel: 4, desc: 'Perfekt & Präteritum forms.' },
      { id: 't5', title: 'Level 5: Complex Sentences', reqLevel: 5, desc: 'Word order, modals & conjunctions.' },
  ];

  // Filter questions based on topic (mock implementation - currently using all questions for demo)
  // In a real app, GRAMMAR_QUESTIONS would be filtered by topic ID.
  // For this prototype, we'll just use the existing small set for any topic to demonstrate the UI flow.
  const activeQuestions = GRAMMAR_QUESTIONS; 
  const question = activeQuestions[currentIndex];

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const checkAnswer = () => {
    setIsAnswered(true);
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentIndex((prev) => (prev + 1) % activeQuestions.length);
  };

  const handleTopicClick = (node: any) => {
      if (userLevel >= node.reqLevel) {
          setSelectedTopic(node.id);
          setCurrentIndex(0);
          setIsAnswered(false);
          setSelectedOption(null);
      }
  };

  if (!selectedTopic) {
      return (
          <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                  {/* Visual Connector Line (Simplified) */}
                  <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10 transform -translate-y-1/2"></div>
                  
                  {skillNodes.map((node) => {
                      const isUnlocked = userLevel >= node.reqLevel;
                      return (
                          <div 
                              key={node.id}
                              onClick={() => handleTopicClick(node)}
                              className={`
                                  relative p-6 rounded-2xl border-2 flex flex-col items-center text-center transition-all duration-300
                                  ${isUnlocked 
                                      ? 'bg-white border-red-100 hover:border-red-400 cursor-pointer shadow-sm hover:shadow-md transform hover:-translate-y-1' 
                                      : 'bg-gray-50 border-gray-200 opacity-70 cursor-not-allowed grayscale'}
                              `}
                          >
                              <div className={`
                                  w-16 h-16 rounded-full flex items-center justify-center mb-4 text-2xl shadow-inner
                                  ${isUnlocked ? 'bg-gradient-to-br from-red-500 to-red-600 text-white' : 'bg-gray-200 text-gray-400'}
                              `}>
                                  {isUnlocked ? <Star fill="white" size={24} /> : <Lock size={24} />}
                              </div>
                              <h4 className="font-bold text-gray-800 mb-1">{node.title}</h4>
                              <p className="text-xs text-gray-500 mb-4">{node.desc}</p>
                              
                              <div className={`
                                  text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full
                                  ${isUnlocked ? 'bg-red-50 text-red-600' : 'bg-gray-200 text-gray-500'}
                              `}>
                                  {isUnlocked ? 'Start' : `Lvl ${node.reqLevel}`}
                              </div>
                          </div>
                      );
                  })}
              </div>
          </div>
      );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-right-8">
      <button 
        onClick={() => setSelectedTopic(null)}
        className="text-xs font-bold text-gray-400 hover:text-gray-600 mb-4 uppercase tracking-wider flex items-center gap-1"
      >
        ← Back to Skill Tree
      </button>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-2xl">⚡</span> Grammar Drill
        </h2>
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Question {currentIndex + 1} / {activeQuestions.length}
        </span>
      </div>

      <div className="mb-8">
        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold mb-4">
          {question.topic}
        </span>
        <h3 className="text-2xl font-medium text-gray-800 leading-snug">
          {question.question}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            disabled={isAnswered}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              isAnswered
                ? idx === question.correctAnswer
                  ? "bg-green-50 border-green-500 text-green-700"
                  : idx === selectedOption
                  ? "bg-red-50 border-red-500 text-red-700"
                  : "border-gray-100 text-gray-400"
                : selectedOption === idx
                ? "border-red-600 bg-red-50 text-red-900"
                : "border-gray-100 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
            }`}
          >
            <div className="flex justify-between items-center">
              <span>{option}</span>
              {isAnswered && idx === question.correctAnswer && <CheckCircle2 size={20} className="text-green-500" />}
              {isAnswered && idx === selectedOption && idx !== question.correctAnswer && <XCircle size={20} className="text-red-500" />}
            </div>
          </button>
        ))}
      </div>

      {!isAnswered ? (
        <button
          onClick={checkAnswer}
          disabled={selectedOption === null}
          className="w-full py-3 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Check Answer
        </button>
      ) : (
        <div className="animate-in fade-in slide-in-from-top-4">
          <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
            <p className="text-sm text-gray-600">
              <span className="font-bold text-gray-900">Explanation:</span> {question.explanation}
            </p>
          </div>
          <button
            onClick={nextQuestion}
            className="w-full py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 flex items-center justify-center gap-2 transition-colors"
          >
            Next Question <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}