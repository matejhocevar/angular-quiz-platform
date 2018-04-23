import {Answer} from './answer.model';

export interface Question {
  id?: number;
  question: string;
  hint?: string;
  answers: Answer[];
  order?: number;
}
