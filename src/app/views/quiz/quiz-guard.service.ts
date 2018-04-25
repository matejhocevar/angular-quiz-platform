import {CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';
import {QuizService} from './quiz.service';

@Injectable()
export class QuizGuard implements CanActivate {

  constructor(
    private quizService: QuizService
  ) {}

  canActivate() {
    return this.quizService.navigateQuiz();
  }
}
