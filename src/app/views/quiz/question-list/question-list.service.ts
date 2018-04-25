import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {Question} from '../../../models/quiz/question.model';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class QuestionListService {
  questionsChanged = new Subject<Question[]>();

  private questions: Question[] = [];

  private questionsRef;

  constructor(db: AngularFireDatabase) {
    this.questionsRef = db.list('questions');
    this.questionsRef.valueChanges().subscribe(questions => {
      this.questions = questions;
      this.questionsChanged.next(this.questions.slice());
    });
  }

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

    this.questionsRef.set(question.id.toString(), question);
    this.questionsChanged.next(this.questions.slice());
  }

  updateQuestion(id: number, newQuestion: Question) {
    const index = this.questions.findIndex(question => question.id === id);
    this.questions[index] = newQuestion;

    this.questionsRef.set(index.toString(), this.questions[index]);
    this.questionsChanged.next(this.questions.slice());
  }

  deleteQuestion(id: number) {
    const index = this.questions.findIndex(question => question.id === id);
    this.questions = this.questions.filter(question => question.id !== id);

    this.questionsRef.remove(index.toString());
    this.questionsChanged.next(this.questions.slice());
  }

  changeQuestionOrder(idFirst: number, idSecond: number) {
    const firstIndex = this.questions.findIndex(question => question.id === idFirst);
    const secondIndex = this.questions.findIndex(question => question.id === idSecond);
    const tempOrder = this.questions[firstIndex].order;
    this.questions[firstIndex].order = this.questions[secondIndex].order;
    this.questions[secondIndex].order = tempOrder;

    this.questionsRef.set(firstIndex.toString(), this.questions[firstIndex]);
    this.questionsRef.set(secondIndex.toString(), this.questions[secondIndex]);
    this.questionsChanged.next(this.questions.slice());
  }

  private getNextId(): number {
    if (this.questions && this.questions.length > 0) {
      return this.questions[this.questions.length - 1].id + 1;
    } else {
      return 0;
    }
  }

  private getNextOrder(): number {
    if (this.questions && this.questions.length > 0) {
      return this.questions[this.questions.length - 1].order + 1;
    } else {
      return 1;
    }
  }
}
