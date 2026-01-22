
export enum AppFlow {
  INTRO = 'INTRO',
  QUIZ = 'QUIZ',
  RESULTS = 'RESULTS',
  MAIN_SITE = 'MAIN_SITE'
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
}

export interface QuizAnswers {
  [key: number]: string;
}
