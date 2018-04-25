import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {SignupComponent} from './signup/signup.component';
import {SigninComponent} from './signin/signin.component';
import {environment} from '../../../../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent
  ],
  imports: [
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ]
})
export class AuthModule {}
