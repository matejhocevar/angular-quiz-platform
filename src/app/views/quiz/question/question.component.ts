import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {QuizService} from '../quiz.service';
import {Question, Score} from '../../../models/quiz/question.model';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Answer} from '../../../models/quiz/answer.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.styl'],
  encapsulation: ViewEncapsulation.None,
})
export class QuestionComponent implements OnInit {
  question: Question;
  id: number;
  questionForm: FormGroup;

  constructor(public quizService: QuizService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.question = this.quizService.getQuestionByOrder(this.id);
        this.question.checked = false;
        this.initForm();
      });
  }

  private initForm() {
    this.questionForm = this.formBuilder.group({
      answers: this.formBuilder.array([])
    });

    if (this.question.answers) {
      for (const a of this.question.answers) {
        const answerArray = (this.questionForm.get('answers')) as FormArray;
        answerArray.push(this.formBuilder.group({
          text: a.text,
          isCorrect: a.isCorrect,
          answer: a.answer
        }));
      }
    }
  }

  numOfCorrectAnswers() {
    return this.question.answers.filter(answer => answer.isCorrect).length;
  }

  onCheck() {
    const score: Score = this.calculateScore(this.questionForm.value.answers);
    this.question.checked = true;
    this.quizService.questionAnswered(score);
    this.questionForm.disable();
  }

  onNext() {
    this.quizService.moveToNextQuestion();
  }

  calculateScore(answersList: Answer[]): Score {
    const score = {} as Score;
    score.points = 0;

    if (this.question.answers) {
      score.totalPoints = this.numOfCorrectAnswers();

      const answered = answersList.filter(answer => answer.answer);
      if (answered.length <= this.numOfCorrectAnswers()) {
        answersList.map(answer => {
          if (answer.answer && answer.isCorrect) {
            score.points++;
          }
        });
      }
    } else {
      score.totalPoints = 0;
    }

    return score;
  }

  getAnswerStatus(answer: FormControl): string {
    if (answer.value.answer === true) {
      return answer.value.isCorrect ? 'correct' : 'incorrect';
    }
    if (answer.value.isCorrect === true) {
      return 'incorrect';
    }
    return null;
  }

  getNumOfCorrectPlural(number: number) {
    if (number < 1) {
      return 'quiz.question.correct.0';
    } else if (number === 1) {
      return 'quiz.question.correct.1';
    } else if (number === 2) {
      return 'quiz.question.correct.2';
    } else if (number === 3 || number === 4) {
      return 'quiz.question.correct.34';
    } else {
      return 'quiz.question.correct.plural';
    }
  }
}
