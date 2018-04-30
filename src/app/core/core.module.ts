import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HeaderComponent} from '../core/header/header.component';
import {AppRoutingModule} from '../app-routing.module';
import {AuthService} from '../auth/auth.service';
import {AuthGuard} from '../auth/auth-guard.service';
import {FooterComponent} from '../core/footer/footer.component';
import {AuthModule} from '../auth/auth.module';
import {AuthRoutingModule} from '../auth/auth-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    SharedModule,
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
export class CoreModule {}
