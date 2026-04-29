export type Page = 'landing' | 'game' | 'result' | 'scoreboard';

export type GameMode =
  | 'digits'
  | 'simple-letters'
  | 'complex-letters'
  | 'similar-pronunciation';

export type Scores = Record<GameMode, number | null>;

export interface GameState {
  page: Page;
  mode: GameMode;
  level: number;
  currentString: string;
  userAnswer: string;
  scores: Scores;
}
