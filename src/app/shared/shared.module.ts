import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HeaderComponent} from './components/header/header.component';
import {AppRoutingModule} from '../app-routing.module';
import {AuthService} from './components/auth/auth.service';
import {AuthGuard} from './components/auth/auth-guard.service';
import {FooterComponent} from './components/footer/footer.component';
import {DropdownDirective} from './directives/dropdown.directive';
import {DataStorageService} from './services/data-storage.service';
import {AuthRoutingModule} from './components/auth/auth-routing.module';
import {AuthModule} from './components/auth/auth.module';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DropdownDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent,
    FooterComponent,
    DropdownDirective
  ],
  providers: [
    AuthService,
    AuthGuard,
    DataStorageService
  ]
})
export class SharedModule {}
