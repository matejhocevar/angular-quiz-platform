import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {QuizService} from '../quiz.service';
import {Question} from '../../../models/quiz/question.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.styl']
})
export class QuestionComponent implements OnInit {
  question: Question;
  id: number;

  constructor(private quizService: QuizService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    this.question = this.quizService.getQuestionByOrder(this.id);

    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.question = this.quizService.getQuestionByOrder(this.id);
      });
  }

  numberOfCorrectAnswers() {
    return this.question.answers.filter(answer => answer.isCorrect).length;
  }
}
