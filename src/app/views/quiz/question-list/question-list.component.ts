import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SortablejsOptions} from 'angular-sortablejs';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';

import {Question} from '../../../models/quiz/question.model';
import {QuizService} from '../quiz.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.styl'],
  encapsulation: ViewEncapsulation.None,
})
export class QuestionListComponent implements OnInit {
  subscription: Subscription;
  questions: Question[];

  questionOptions: SortablejsOptions = {
    onUpdate: (event) => this.onOrderChanged(event),
    dragClass: 'drag-handle',
    draggable: '.list-group-item'
  };

  constructor(private quizService: QuizService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.quizService.questionsChanged
      .subscribe(
        (questions: Question[]) => this.questions = questions
      );

    this.questions = this.quizService.getQuestions();
  }

  onOrderChanged(event: Event) {
    this.quizService.changeQuestionOrder(event['newIndex'], event['oldIndex']);
  }

  onNewQuestion() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onDeleteAnswer(index: number) {
    this.quizService.deleteQuestion(index);
    this.router.navigate(['/quiz/list']);
  }
}
