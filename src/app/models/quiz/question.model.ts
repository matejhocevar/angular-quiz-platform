import {Answer} from './answer.model';
import {Section} from './section.model';

export interface Question {
  id?: number;
  question: string;
  hint?: string;
  answers: Answer[];
  order?: number;
  checked?: boolean;
  score?: Score;
  section?: Section;
}

export interface Score {
  points: number;
  totalPoints: number;
}
