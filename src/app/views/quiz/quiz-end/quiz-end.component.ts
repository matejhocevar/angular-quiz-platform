import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-quiz-end',
  templateUrl: './quiz-end.component.html',
  styleUrls: ['./quiz-end.component.styl']
})
export class QuizEndComponent implements OnInit {
  quiz = environment.quiz;

  constructor() { }

  ngOnInit() {
  }

}
