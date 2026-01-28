"use client";

import React, { useState } from 'react';
import { GRAMMAR_QUESTIONS, GrammarQuestion } from '../lib/data';
import { CheckCircle2, XCircle, ArrowRight, RefreshCcw } from 'lucide-react';

export default function GrammarTrainer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const question = GRAMMAR_QUESTIONS[currentIndex];

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
    setCurrentIndex((prev) => (prev + 1) % GRAMMAR_QUESTIONS.length);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-2xl">⚡</span> Grammar Drill
        </h2>
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Question {currentIndex + 1} / {GRAMMAR_QUESTIONS.length}
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
