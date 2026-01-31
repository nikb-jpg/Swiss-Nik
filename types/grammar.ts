export type ClauseType = 'HAUPTSATZ' | 'NEBENSATZ';

export interface GrammarToken {
  id: string;
  text: string;
  type: 'SUBJECT' | 'VERB' | 'OBJECT' | 'CONNECTOR' | 'ADVERB' | 'PUNCTUATION';
  role: string;
}

export interface B1Situation {
  id: string;
  visualPrompt: string;
  connector: string;
  clauseStructure: ClauseType;
  tokens: GrammarToken[];
  correctSequence: string[];
  explanation: string;
}

export interface GrammarState {
  score: number;
  streak: number;
  weakPoints: string[];
}
