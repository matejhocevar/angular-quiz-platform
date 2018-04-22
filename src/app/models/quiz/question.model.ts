import {Answer} from './answer.model';

export interface Question {
  id?: number;
  question: String;
  hint?: String;
  answers: Answer[];
  order?: number;
}
