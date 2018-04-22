import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {Question} from '../../../models/quiz/question.model';

@Injectable()
export class QuestionListService {
  questionItemChanged = new Subject<Question[]>();

  private questions: Question[] = [
    {
      id: 0,
      question: 'Koliko je 3x4?',
      answers: [
        {text: '6', isCorrect: false},
        {text: '8', isCorrect: false},
        {text: '12', isCorrect: true},
        {text: '16', isCorrect: false}
      ],
      order: 1
    },
    {
      id: 1,
      question: 'Ali je kit sesalec?',
      answers: [
        {text: 'Da', isCorrect: true},
        {text: 'Ne', isCorrect: false}
      ],
      order: 2
    }
  ];

  getQuestions(): Question[] {
    return this.questions.slice();
  }

  getQuestion(id: number): Question {
    return this.questions.find(question => question.id === id);
  }
}
