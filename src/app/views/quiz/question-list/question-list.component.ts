import { Component, OnInit } from '@angular/core';
import {SortablejsOptions} from 'angular-sortablejs';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';

import {QuestionListService} from './question-list.service';
import {Question} from '../../../models/quiz/question.model';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.styl']
})
export class QuestionListComponent implements OnInit {
  subscription: Subscription;
  questions: Question[];

  questionOptions: SortablejsOptions = {
    onUpdate: (event) => this.onOrderChanged(event),
    dragClass: 'drag-handle'
  };

  constructor(private questionListService: QuestionListService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.questionListService.questionItemChanged
      .subscribe(
        (questions: Question[]) => this.questions = questions
      );

    this.questions = this.questionListService.getQuestions();
  }

  onOrderChanged(event: Event) {
    console.log(event);
  }

  onNewQuestion() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
