import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {QuizService} from '../quiz.service';
import {Question} from '../../../models/quiz/question.model';

@Component({
  selector: 'app-quiz-end',
  templateUrl: './quiz-end.component.html',
  styleUrls: ['./quiz-end.component.styl']
})
export class QuizEndComponent implements OnInit {
  quiz = environment.quiz;
  headline: string;
  headlines = [
    { score: 90, headline: 'Excellent!' },
    { score: 75, headline: 'Great job!' },
    { score: 65, headline: 'Well done!' },
    { score: 50, headline: 'Good job!' },
    { score: 35, headline: 'Not bad!' },
    { score: 0, headline: 'What do you want me to say...' },
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
