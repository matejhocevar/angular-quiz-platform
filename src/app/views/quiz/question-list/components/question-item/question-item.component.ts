import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../../../models/quiz/question.model';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {QuizService} from '../../../quiz.service';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.styl']
})
export class QuestionItemComponent implements OnInit {
  id: number;
  editMode = false;
  questionForm: FormGroup;

  constructor(
    private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null && params['id'] !== 'new';

        this.initForm();
      }
    );
  }

  onSubmit() {
    if (this.editMode) {
      this.quizService.updateQuestion(this.id, this.questionForm.value);
    } else {
      this.quizService.addQuestion(this.questionForm.value);
    }

    this.router.navigate(['../'], {relativeTo: this.route});

    this.onCancel();
  }

  onAddAnswer() {
    (<FormArray>this.questionForm.get('answers')).push(
      new FormGroup({
        'text': new FormControl(
          null,
          Validators.required
        ),
        'isCorrect': new FormControl(
          null
        )
      })
    );
  }

  onDeleteAnswer(index: number) {
    (<FormArray>this.questionForm.get('answers')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let questionId: number;
    let questionText = '';
    let questionHint = '';
    let questionOrder: number;
    const answers = new FormArray([]);

    if (this.editMode) {
      const question: Question = this.quizService.getQuestion(this.id);
      questionId = question.id;
      questionText = question.question;
      questionHint = question.hint;
      questionOrder = question.order;

      if (question['answers']) {
        for (const answer of question.answers) {
          answers.push(
            new FormGroup({
              'text': new FormControl(answer.text, Validators.required),
              'isCorrect': new FormControl(answer.isCorrect)
            })
          );
        }
      }
    }

    this.questionForm = new FormGroup(
      {
        'id': new FormControl(questionId),
        'question': new FormControl(questionText, Validators.required),
        'hint': new FormControl(questionHint),
        'order': new FormControl(questionOrder),
        'answers': answers
      }
    );
  }
}
