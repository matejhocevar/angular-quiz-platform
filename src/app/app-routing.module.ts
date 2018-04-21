import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/quiz', pathMatch: 'full' },
  { path: 'quiz', loadChildren: 'app/views/quiz/quiz.module#QuizModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
