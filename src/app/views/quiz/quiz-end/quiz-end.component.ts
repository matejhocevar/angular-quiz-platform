import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-quiz-end',
  templateUrl: './quiz-end.component.html',
  styleUrls: ['./quiz-end.component.styl']
})
export class QuizEndComponent implements OnInit {
  quiz = environment.quiz;
  quizHeadline = 'Not bad!';
  quizHeadlines = [
    { score: 90, headline: 'Excellent!' },
    { score: 75, headline: 'Great job!' },
    { score: 65, headline: 'Well done!' },
    { score: 50, headline: 'Good job!' },
    { score: 35, headline: 'Not bad!' },
    { score: 0, headline: 'What do you want me to say...' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
