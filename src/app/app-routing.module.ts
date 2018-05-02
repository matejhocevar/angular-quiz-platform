import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {environment} from '../environments/environment';

const appRoutes: Routes = [
  { path: '', redirectTo: environment.routing.main, pathMatch: 'full' },
  { path: environment.routing.main, loadChildren: 'app/views/quiz/quiz.module#QuizModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
