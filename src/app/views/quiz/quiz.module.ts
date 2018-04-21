import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {QuizComponent} from './quiz.component';
import {QuestionListComponent} from './question-list/question-list.component';
import {QuizStartComponent} from './quiz-start/quiz-start.component';
import {QuizEndComponent} from './quiz-end/quiz-end.component';
import {QuestionItemComponent} from './question-list/components/question-item/question-item.component';
import {QuestionComponent} from './question/question.component';
import {QuestionItemEditComponent} from './question-list/components/question-item-edit/question-item-edit.component';
import {QuizRoutingModule} from './quiz-routing.module';


@NgModule({
  declarations: [
    QuizComponent,
    QuestionComponent,
    QuestionListComponent,
    QuestionItemComponent,
    QuestionItemEditComponent,
    QuizStartComponent,
    QuizEndComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuizRoutingModule
  ],
  exports: [],
  providers: [],
  bootstrap: []
})
export class QuizModule {}
