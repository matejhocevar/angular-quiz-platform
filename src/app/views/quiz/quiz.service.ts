import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {Question, Score} from '../../models/quiz/question.model';
import {AngularFireDatabase} from 'angularfire2/database';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../environments/environment';
import {Section} from '../../models/quiz/section.model';

@Injectable()
export class QuizService {
  questionsChanged = new Subject<Question[]>();

  showNumCorrectAnswers = false;

  quizStarted = false;
  quizEnded = false;

  public questionsCompleted: Question[] = [];
  public questionsTodo: Question[] = [];

  public sections: Section[] = environment.quiz.sections;
  public questions: Question[] = [];
  public filteredQuestions: Question[] = null;
  private questionsRef;

  constructor(
    db: AngularFireDatabase,
    private router: Router,
    private title: Title,
    private translate: TranslateService
  ) {
    this.questionsRef = db.list('questions', ref => ref.orderByChild('order'));
    this.questionsRef.valueChanges().subscribe(questions => {
      this.questions = questions;
      this.filteredQuestions = questions;
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

  getSections(): Section[] {
    return this.sections;
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

  changeQuestionOrder(orderTo: number, orderFrom: number) {
    const fromIndex = this.questions.findIndex(question => question.order === orderFrom);
    const toIndex = this.questions.findIndex(question => question.order === orderTo);
    const tempOrder = this.questions[toIndex].order;
    this.questions[toIndex].order = this.questions[fromIndex].order;
    this.questions[fromIndex].order = tempOrder;

    this.questionsRef.set(this.questions[fromIndex].id.toString(), this.questions[fromIndex]);
    this.questionsRef.set(this.questions[toIndex].id.toString(), this.questions[toIndex]);
    this.questionsChanged.next(this.questions.slice());
  }

  private getNextId(): number {
    let max = -1;
    this.questions.map(question => {
      if (max < question.id) {
        max = question.id;
      }
    });
    return max + 1;
  }

  private getNextOrder(): number {
    let max = 0;
    this.questions.map(question => {
      if (max < question.order) {
        max = question.order;
      }
    });
    return max + 1;
  }

  navigateQuiz() {
    if (this.questions == null || this.questions.length < 1) {
      this.quizStarted = false;
    }

    if (this.quizEnded) {
      this.router.navigate([`/${environment.routing.main}/${environment.routing.quiz.end}`]);
      return false;
    }

    if (!this.quizStarted) {
      this.router.navigate([`/${environment.routing.main}/${environment.routing.quiz.start}`]);
      return false;
    }

    return true;
  }

  questionAnswered(score: Score) {
    this.questionsTodo[0].checked = true;
    this.questionsTodo[0].score = score;
    this.questionsCompleted.push(this.questionsTodo[0]);
    this.questionsTodo = this.questionsTodo.slice(1, this.questionsTodo.length);
  }

  moveToNextQuestion() {
    if (this.nextQuestionId() == null) {
      this.quizEnded = true;
      this.router.navigate([`/${environment.routing.main}/${environment.routing.quiz.end}`]);
      this.translate.get('quiz.end.title').subscribe(text => this.title.setTitle(text));
      return;
    }

    const nextQuestionId = this.nextQuestionId();
    this.router.navigate([`/${environment.routing.main}/${+nextQuestionId}`]);
    this.translate.get('quiz.question.title', {id: nextQuestionId}).subscribe(text => this.title.setTitle(text));
  }

  nextQuestionId(): number {
    if (this.questionsTodo.length === 0) {
      return null;
    }
    return this.questionsTodo[0].order;
  }

  getTotalScore(): [number, number] {
    let points = 0;
    let totalPoints = 0;

    this.questionsCompleted.map(question => {
      points += question.score.points;
      totalPoints += question.score.totalPoints;
    });

    return [points, totalPoints];
  }

  getQuestionProgress(): number {
    return (this.questionsCompleted.length / this.filteredQuestions.length) * 100;
  }
}
