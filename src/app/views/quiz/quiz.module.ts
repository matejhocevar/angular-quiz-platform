import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SortablejsModule} from 'angular-sortablejs';

import {QuizComponent} from './quiz.component';
import {QuestionListComponent} from './question-list/question-list.component';
import {QuizStartComponent} from './quiz-start/quiz-start.component';
import {QuizEndComponent} from './quiz-end/quiz-end.component';
import {QuestionItemComponent} from './question-list/components/question-item/question-item.component';
import {QuestionComponent} from './question/question.component';
import {QuizRoutingModule} from './quiz-routing.module';
import {QuestionItemStartComponent} from './question-list/components/question-item-start/question-item-start.component';
import {QuizService} from './quiz.service';
import {QuizEndGuard, QuizGuard} from './quiz-guard.service';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [
    QuizComponent,
    QuestionComponent,
    QuestionListComponent,
    QuestionItemComponent,
    QuizStartComponent,
    QuizEndComponent,
    QuestionItemStartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuizRoutingModule,
    SortablejsModule,
    TranslateModule
  ],
  exports: [],
  providers: [QuizService, QuizGuard, QuizEndGuard],
  bootstrap: []
})
export class QuizModule {}
