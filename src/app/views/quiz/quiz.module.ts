import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {SortablejsModule} from 'angular-sortablejs';

import {QuizComponent} from './quiz.component';
import {QuestionListComponent} from './question-list/question-list.component';
import {QuizStartComponent} from './quiz-start/quiz-start.component';
import {QuizEndComponent} from './quiz-end/quiz-end.component';
import {QuestionItemComponent} from './question-list/components/question-item/question-item.component';
import {QuestionComponent} from './question/question.component';
import {QuestionItemEditComponent} from './question-list/components/question-item-edit/question-item-edit.component';
import {QuizRoutingModule} from './quiz-routing.module';
import {QuestionItemStartComponent} from './question-list/components/question-item-start/question-item-start.component';
import {QuestionListService} from './question-list/question-list.service';


@NgModule({
  declarations: [
    QuizComponent,
    QuestionComponent,
    QuestionListComponent,
    QuestionItemComponent,
    QuestionItemEditComponent,
    QuizStartComponent,
    QuizEndComponent,
    QuestionItemStartComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuizRoutingModule,
    SortablejsModule
  ],
  exports: [],
  providers: [QuestionListService],
  bootstrap: []
})
export class QuizModule {}
