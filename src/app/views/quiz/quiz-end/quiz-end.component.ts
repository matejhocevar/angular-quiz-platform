import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {QuizService} from '../quiz.service';
import {Question} from '../../../models/quiz/question.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-quiz-end',
  templateUrl: './quiz-end.component.html',
  styleUrls: ['./quiz-end.component.styl']
})
export class QuizEndComponent implements OnInit {
  i18nRouting = environment.routing;
  quiz = environment.quiz;
  headline: Object;
  headlines = [
    { score: 90, headline: 'quiz.end.headlines.90' },
    { score: 75, headline: 'quiz.end.headlines.75' },
    { score: 65, headline: 'quiz.end.headlines.65' },
    { score: 50, headline: 'quiz.end.headlines.50' },
    { score: 35, headline: 'quiz.end.headlines.35' },
    { score: 0, headline: 'quiz.end.headlines.0' },
  ];
  points: number;
  totalPoints: number;
  scorePct: number;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizService.quizEnded = true;
    this.calculateScore();
    this.calculateHeadline();
  }

  calculateScore() {
    [this.points, this.totalPoints] = this.quizService.getTotalScore();
    this.scorePct = (this.points / this.totalPoints) * 100;
  }

  calculateHeadline() {
    const headline = this.headlines.find(hl => this.scorePct >= hl.score);
    if (headline) {
      this.headline = headline.headline;
    } else {
      this.headline = this.headlines[this.headlines.length - 1].headline;
    }
  }
}
