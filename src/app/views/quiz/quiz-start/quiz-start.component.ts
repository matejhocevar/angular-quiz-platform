import {Component, OnInit} from '@angular/core';
import {QuizService} from '../quiz.service';
import {Question} from '../../../models/quiz/question.model';
import {environment} from '../../../../environments/environment';
import {NgForm} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.styl']
})
export class QuizStartComponent implements OnInit {
  quiz = environment.quiz;
  questions: Question[];

  constructor(
    private quizService: QuizService,
    private title: Title,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.translate.get('quiz.start.title').subscribe(text => this.title.setTitle(text));
    this.questions = this.quizService.questions;

    if (this.quizService.quizEnded) {
      this.quizService.quizStarted = false;
      this.quizService.quizEnded = false;
    }

    this.quizService.questionsChanged.subscribe(questions => {
      this.questions = questions;
    });
  }

  onQuizStart(form: NgForm) {
    const showProgress = form.value ? form.value.showProgress : false;
    const randomQuestions = form.value ? form.value.randomQuestions : false;

    this.prepareQuestions(randomQuestions);

    this.quizService.quizStarted = true;
    this.quizService.quizEnded = false;

    this.quizService.moveToNextQuestion();
  }

  onQuizResume() {
    this.quizService.moveToNextQuestion();
  }

  prepareQuestions(random: boolean) {
    this.quizService.questionsCompleted = [];

    if (random) {
      this.quizService.questionsTodo = this.shuffle(this.questions.slice());
    } else {
      this.quizService.questionsTodo = this.questions.slice();
    }
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
