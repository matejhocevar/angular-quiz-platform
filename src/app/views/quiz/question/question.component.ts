import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {QuizService} from '../quiz.service';
import {Question} from '../../../models/quiz/question.model';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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
    this.question.checked = true;
    this.quizService.questionAnswered();
  }

  onNext() {
    this.quizService.moveToNextQuestion();
    return;
  }
}
