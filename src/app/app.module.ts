import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { QuizComponent } from './views/quiz/quiz.component';
import { QuestionComponent } from './views/quiz/question/question.component';
import { QuestionListComponent } from './views/quiz/question-list/question-list.component';
import { QuestionItemComponent } from './views/quiz/question-list/components/question-item/question-item.component';
import { QuestionItemEditComponent } from './views/quiz/question-list/components/question-item-edit/question-item-edit.component';
import { QuizStartComponent } from './views/quiz/quiz-start/quiz-start.component';
import { QuizEndComponent } from './views/quiz/quiz-end/quiz-end.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuizComponent,
    QuestionComponent,
    QuestionListComponent,
    QuestionItemComponent,
    QuestionItemEditComponent,
    QuizStartComponent,
    QuizEndComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
