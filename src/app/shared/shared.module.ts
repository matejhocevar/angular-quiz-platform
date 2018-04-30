import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthService} from '../auth/auth.service';
import {AuthGuard} from '../auth/auth-guard.service';
import {TranslateModule} from '@ngx-translate/core';
import {SlantedComponent} from './slanted/slanted.component';


@NgModule({
  declarations: [
    SlantedComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    SlantedComponent
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class SharedModule {}
