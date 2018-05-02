import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {QuestionListComponent} from './question-list/question-list.component';
import {QuestionComponent} from './question/question.component';
import {QuestionItemComponent} from './question-list/components/question-item/question-item.component';
import {QuestionItemStartComponent} from './question-list/components/question-item-start/question-item-start.component';
import {AuthGuard} from '../../auth/auth-guard.service';
import {QuizStartComponent} from './quiz-start/quiz-start.component';
import {QuizEndComponent} from './quiz-end/quiz-end.component';
import {QuizEndGuard, QuizGuard} from './quiz-guard.service';
import {environment} from '../../../environments/environment';


const quizRoutes: Routes = [
  { path: '', redirectTo: '/' + environment.routing.main + '/' + environment.routing.quiz.start, pathMatch: 'full' },
  { path: environment.routing.quiz.start, component: QuizStartComponent },
  { path: environment.routing.quiz.end, component: QuizEndComponent, canActivate: [QuizEndGuard] },
  { path: environment.routing.quiz.list.main, component: QuestionListComponent, canActivate: [AuthGuard], children: [
      { path: '', component: QuestionItemStartComponent},
      { path: environment.routing.quiz.list.edit, component: QuestionItemComponent },
      { path: ':id', component: QuestionItemComponent }
    ]},
  { path: ':id', component: QuestionComponent, canActivate: [QuizGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(quizRoutes)],
  exports: [RouterModule]
})
export class QuizRoutingModule {}
