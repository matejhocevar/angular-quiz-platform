import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {SignupComponent} from './signup/signup.component';
import {SigninComponent} from './signin/signin.component';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent
  ],
  imports: [
    FormsModule
  ]
})
export class AuthModule {}
