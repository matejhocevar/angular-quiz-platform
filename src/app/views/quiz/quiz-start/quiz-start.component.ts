import {Component, OnInit, ViewChild} from '@angular/core';
import {QuizService} from '../quiz.service';
import {Question} from '../../../models/quiz/question.model';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.styl']
})
export class QuizStartComponent implements OnInit {
  quiz = environment.quiz;
  questions: Question[];

  @ViewChild('randomInput') randomInput;
  @ViewChild('progressInput') progressInput;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.questions = this.quizService.questions;
    this.quizService.quizStarted = true;
  }

  onQuizStart() {
    this.prepareQuestions(false);
  }

  onQuizResume() {
    // TODO
  }

  prepareQuestions(random: boolean) {
    if (random) {
      this.quizService.questionsTodo = this.shuffle(this.questions.slice());
    } else {
      this.quizService.questionsTodo = this.questions.slice();
    }
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
