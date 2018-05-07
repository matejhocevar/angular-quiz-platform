import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SignupComponent} from './signup/signup.component';
import {SigninComponent} from './signin/signin.component';
import {environment} from '../../environments/environment';
import {SignUpGuard} from './auth-guard.service';

const authRoutes: Routes = [
  { path: environment.routing.auth.signup, component: SignupComponent, canActivate: [SignUpGuard]},
  { path: environment.routing.auth.signin, component: SigninComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
