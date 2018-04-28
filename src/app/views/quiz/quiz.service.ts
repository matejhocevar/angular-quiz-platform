import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {Question} from '../../models/quiz/question.model';
import {AngularFireDatabase} from 'angularfire2/database';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Injectable()
export class QuizService {
  questionsChanged = new Subject<Question[]>();

  quizStarted = false;
  quizEnded = false;

  public questionsCompleted: Question[] = [];
  public questionsTodo: Question[] = [];
  public currentQuestion: Question;

  public questions: Question[] = [];
  private questionsRef;

  constructor(
    db: AngularFireDatabase,
    private router: Router,
    private title: Title
  ) {
    this.questionsRef = db.list('questions', ref => ref.orderByChild('order'));
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

  getQuestionByOrder(order: number): Question {
    return this.questions.find(question => question.order === order);
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

  navigateQuiz() {
    if (this.questions == null || this.questions.length < 1) {
      this.quizStarted = false;
    }

    if (this.quizEnded) {
      this.router.navigate(['/quiz/end']);
      return false;
    }

    if (!this.quizStarted) {
      this.router.navigate(['/quiz/start']);
      return false;
    }

    return true;
  }

  questionAnswered() {
    this.questionsTodo[0].checked = true;
    this.questionsCompleted.push(this.questionsTodo[0]);
    this.questionsTodo = this.questionsTodo.slice(1, this.questionsTodo.length);
  }

  moveToNextQuestion() {
    if (this.nextQuestionId() == null) {
      this.quizEnded = true;
      this.router.navigate(['/quiz/end']);
      this.title.setTitle(`The End`);
      return;
    }

    const nextQuestionId = this.nextQuestionId();
    this.router.navigate([`/quiz/${+nextQuestionId}`]);
    this.title.setTitle(`Question #${nextQuestionId}`);
  }

  nextQuestionId(): number {
    if (this.questionsTodo.length === 0) {
      return null;
    }
    return this.questionsTodo[0].order;
  }
}
