import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {Question} from '../../../models/quiz/question.model';

@Injectable()
export class QuestionListService {
  questionsChanged = new Subject<Question[]>();

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
      order: 10
    },
    {
      id: 1,
      question: 'Ali je kit sesalec?',
      answers: [
        {text: 'Da', isCorrect: true},
        {text: 'Ne', isCorrect: false}
      ],
      order: 20
    }
  ];

  getQuestions(): Question[] {
    return this.questions.slice();
  }

  getQuestion(id: number): Question {
    return this.questions.find(question => question.id === id);
  }

  addQuestion(question: Question) {
    if (question.id == null) {
      question.id = this.getNextId();
    }
    if (question.order == null) {
      question.order = this.getNextOrder();
    }

    this.questions.push(question);
    this.questionsChanged.next(this.questions.slice());
  }

  updateQuestion(id: number, newQuestion: Question) {
    const index = this.questions.findIndex(question => question.id === id);
    this.questions[index] = newQuestion;
    this.questionsChanged.next(this.questions.slice());
  }

  deleteQuestion(id: number) {
    this.questions = this.questions.filter(question => question.id !== id);
    this.questionsChanged.next(this.questions.slice());
  }

  private getNextId(): number {
    if (this.questions && this.questions.length > 0) {
      return this.questions[this.questions.length - 1].id++;
    } else {
      return 0;
    }
  }

  private getNextOrder(): number {
    if (this.questions && this.questions.length > 0) {
      return this.questions[this.questions.length - 1].order + 10;
    } else {
      return 0;
    }
  }
}
