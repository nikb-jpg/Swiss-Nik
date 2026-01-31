export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  level: "B1" | "B2" | "C1";
  tags: string[];
}

export interface VocabularyItem {
  id: string;
  word: string;
  context: string;
  translation?: string; // Re-added for UI compatibility
  timestamp: number;
  interval: number;
  repetition: number;
  easiness: number;
  nextReview: number;
}

export interface DailyQuests {
  date: string;
  read: boolean;
  vocab: boolean;
  journal: boolean;
}

export interface Flashcard {
  id: string;
  german: string;
  english: string;
  exampleSentence: string;
  mastered: boolean;
}

export interface GrammarQuestion {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const MOCK_FLASHCARDS: Flashcard[] = [
  {
    id: "1",
    german: "die Nachhaltigkeit",
    english: "sustainability",
    exampleSentence: "Nachhaltigkeit ist wichtig für unsere Zukunft.",
    mastered: false
  }
];

export const GRAMMAR_QUESTIONS: GrammarQuestion[] = [
  {
    id: "g1",
    topic: "Konjunktiv II",
    question: "Wenn ich reich ______, ______ ich eine Weltreise machen.",
    options: ["wäre / würde", "war / werde", "bin / wird", "sei / wurde"],
    correctAnswer: 0,
    explanation: "Hypothetical wishes use Konjunktiv II (wäre/würde)."
  }
];

export function calculateSM2(quality: number, prevInterval: number, prevRepetition: number, prevEasiness: number) {
  let interval: number;
  let repetition: number;
  let easiness: number;

  if (quality >= 3) {
    if (prevRepetition === 0) interval = 1;
    else if (prevRepetition === 1) interval = 6;
    else interval = Math.round(prevInterval * prevEasiness);
    repetition = prevRepetition + 1;
  } else {
    repetition = 0;
    interval = 1;
  }

  easiness = prevEasiness + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easiness < 1.3) easiness = 1.3;

  const nextReview = Date.now() + interval * 24 * 60 * 60 * 1000;
  return { interval, repetition, easiness, nextReview };
}