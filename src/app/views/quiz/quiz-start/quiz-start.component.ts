import { Component, OnInit } from '@angular/core';
import {QuizService} from '../quiz.service';
import {Question} from '../../../models/quiz/question.model';

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.styl']
})
export class QuizStartComponent implements OnInit {
  questions: Question[];

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.questions = this.quizService.questions;
    this.quizService.quizStarted = true;
    console.log(this.questions);
  }

}
