import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {QuestionListComponent} from './question-list/question-list.component';
import {QuestionComponent} from './question/question.component';
import {QuizComponent} from './quiz.component';
import {QuestionItemComponent} from './question-list/components/question-item/question-item.component';
import {QuestionItemStartComponent} from './question-list/components/question-item-start/question-item-start.component';
import {AuthGuard} from '../../shared/components/auth/auth-guard.service';


const quizRoutes: Routes = [
  { path: '', component: QuizComponent },
  { path: 'list', component: QuestionListComponent, canActivate: [AuthGuard], children: [
      { path: '', component: QuestionItemStartComponent},
      { path: 'new', component: QuestionItemComponent },
      { path: ':id', component: QuestionItemComponent }
    ]},
  { path: ':id', component: QuestionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(quizRoutes)],
  exports: [RouterModule]
})
export class QuizRoutingModule {}
