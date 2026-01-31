export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  level: "B1" | "B2" | "C1";
  tags: string[];
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

export interface VocabularyItem {
  id: string;
  word: string;
  context: string; // The example sentence
  translation?: string;
  timestamp: number;
}

// ... existing MOCK data ...
export const MOCK_ARTICLES: Article[] = [
  {
    id: "1",
    title: "Die Zukunft der Arbeit",
    excerpt: "Wie künstliche Intelligenz unseren Arbeitsalltag verändert.",
    content: `Die Digitalisierung schreitet unaufhaltsam voran. Viele Berufe werden sich in den nächsten Jahren grundlegend wandeln. Es ist wichtig, sich ständig weiterzubilden, um den Anschluss nicht zu verlieren. 
    
Experten prognostizieren, dass Routineaufgaben zunehmend von Algorithmen übernommen werden. Das bedeutet jedoch nicht zwangsläufig Massenarbeitslosigkeit. Stattdessen entstehen neue Berufsbilder, die Kreativität und soziale Intelligenz erfordern.

Für Arbeitnehmer bedeutet dies: Lebenslanges Lernen wird zur Pflicht. Wer bereit ist, sich anzupassen, wird auch in Zukunft gefragt sein.`,
    level: "B2",
    tags: ["Technology", "Society"]
  },
  {
    id: "2",
    title: "Nachhaltigkeit in den Alpen",
    excerpt: "Tourismus und Naturschutz im Einklang?",
    content: `Die Schweizer Alpen sind ein beliebtes Reiseziel für Menschen aus aller Welt. Doch der Massentourismus belastet die empfindliche Natur stark. Müll, Lärm und Verkehr sind ernsthafte Probleme.
    
Neue Konzepte sind gefragt. Einige Regionen setzen auf "sanften Tourismus". Das bedeutet: Anreise mit der Bahn, regionale Produkte und Respekt vor der Tierwelt.

Ist das genug? Umweltschützer fordern strengere Gesetze, um die Gletscher und Wälder für kommende Generationen zu bewahren.`,
    level: "B1",
    tags: ["Nature", "Switzerland"]
  },
  {
    id: "3",
    title: "Kulturelle Unterschiede",
    excerpt: "Was man beim Smalltalk in Deutschland beachten sollte.",
    content: `Während Amerikaner oft sehr offen sind und schnell persönliche Themen ansprechen, brauchen Deutsche oft eine gewisse Anlaufzeit. Privates und Berufliches wird oft strikt getrennt.
    
Ein klassisches Beispiel ist die Frage "Wie geht's?". In den USA oft nur eine Floskel, erwarten Deutsche hierauf oft eine ehrliche, wenn auch kurze Antwort.

Auch Humor wird anders eingesetzt. Ironie ist in Deutschland sehr beliebt, kann aber von Außenstehenden leicht missverstanden werden.`,
    level: "C1",
    tags: ["Culture", "Communication"]
  }
];

export const MOCK_FLASHCARDS: Flashcard[] = [
  {
    id: "1",
    german: "die Nachhaltigkeit",
    english: "sustainability",
    exampleSentence: "Nachhaltigkeit ist wichtig für unsere Zukunft.",
    mastered: false
  },
  {
    id: "2",
    german: "unverzichtbar",
    english: "indispensable",
    exampleSentence: "Wasser ist für das Leben unverzichtbar.",
    mastered: false
  },
  {
    id: "3",
    german: "die Herausforderung",
    english: "challenge",
    exampleSentence: "Der Klimawandel ist eine große Herausforderung.",
    mastered: false
  }
];

export const GRAMMAR_QUESTIONS: GrammarQuestion[] = [
  {
    id: "g1",
    topic: "Konjunktiv II (Wünsche)",
    question: "Wenn ich reich ______, ______ ich eine Weltreise machen.",
    options: ["wäre / würde", "war / werde", "bin / wird", "sei / wurde"],
    correctAnswer: 0,
    explanation: "For hypothetical wishes in the present, use 'wäre' (sein) and 'würde' + infinitive."
  },
  {
    id: "g2",
    topic: "Passiv (Präsens)",
    question: "Das Haus ______ von den Arbeitern ______.",
    options: ["wird / gebaut", "werde / gebaut", "wurde / bauen", "ist / gebaut"],
    correctAnswer: 0,
    explanation: "Present Passive is formed with 'werden' + Partizip II. 'Das Haus' is singular (wird)."
  },
  {
    id: "g3",
    topic: "Präpositionen (Genitiv)",
    question: "______ des schlechten Wetters gingen wir spazieren.",
    options: ["Trotz", "Wegen", "Während", "Anstatt"],
    correctAnswer: 0,
    explanation: "'Trotz' (despite) takes the Genitive case and fits the context of going for a walk *despite* bad weather."
  }
];
