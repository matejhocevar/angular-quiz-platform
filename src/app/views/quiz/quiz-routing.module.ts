import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {QuestionListComponent} from './question-list/question-list.component';
import {QuizEndComponent} from './quiz-end/quiz-end.component';
import {QuestionComponent} from './question/question.component';
import {QuizComponent} from './quiz.component';


const quizRoutes: Routes = [
  { path: '', component: QuizComponent },
  { path: ':id', component: QuestionComponent },
  { path: ':id/edit', component: QuestionComponent },
  { path: 'end', component: QuizEndComponent },
  { path: 'list', component: QuestionListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(quizRoutes)],
  exports: [RouterModule]
})
export class QuizRoutingModule {}
