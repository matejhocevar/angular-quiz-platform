import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {QuizService} from '../quiz.service';
import {Question, Score} from '../../../models/quiz/question.model';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Answer} from '../../../models/quiz/answer.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.styl']
})
export class QuestionComponent implements OnInit {
  question: Question;
  id: number;
  questionForm: FormGroup;

  constructor(private quizService: QuizService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    this.question = this.quizService.getQuestionByOrder(this.id);

    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.question = this.quizService.getQuestionByOrder(this.id);
        this.initForm();
      });
  }

  private initForm() {
    this.questionForm = this.formBuilder.group({
      answers: this.formBuilder.array([])
    });

    for (const a of this.question.answers) {
      const answerArray = (this.questionForm.get('answers')) as FormArray;
      answerArray.push(this.formBuilder.group({
        text: a.text,
        isCorrect: a.isCorrect,
        answer: a.answer
      }));
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
    score.totalPoints = this.numOfCorrectAnswers();

    const answered = answersList.filter(answer => answer.answer);
    if (answered.length <= this.numOfCorrectAnswers()) {
      answersList.map(answer => {
        if (answer.answer && answer.isCorrect) {
          score.points++;
        }
      });
    }

    return score;
  }

  getAnswerStatus(answer: FormControl): string {
    if (answer.value.answer === true) {
      return answer.value.isCorrect ? 'correct' : 'incorrect';
    }
    return null;
  }
}
