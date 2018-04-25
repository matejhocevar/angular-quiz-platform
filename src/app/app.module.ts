import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {SortablejsModule} from 'angular-sortablejs';
import {SharedModule} from './shared/shared.module';
import {AuthModule} from './shared/components/auth/auth.module';
import {AuthRoutingModule} from './shared/components/auth/auth-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    AuthRoutingModule,
    NgbModule.forRoot(),
    SortablejsModule.forRoot({ animation: 150 })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
