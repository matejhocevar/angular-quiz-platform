import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HeaderComponent} from './components/header/header.component';
import {AppRoutingModule} from '../app-routing.module';
import {AuthService} from './components/auth/auth.service';
import {AuthGuard} from './components/auth/auth-guard.service';
import {FooterComponent} from './components/footer/footer.component';
import {AuthModule} from './components/auth/auth.module';
import {AuthRoutingModule} from './components/auth/auth-routing.module';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    AuthRoutingModule,
    TranslateModule
  ],
  exports: [
    AppRoutingModule,
    AuthModule,
    AuthRoutingModule,
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class SharedModule {}
