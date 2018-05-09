import {Component, OnInit} from '@angular/core';
import {QuizService} from '../quiz.service';
import {Question} from '../../../models/quiz/question.model';
import {environment} from '../../../../environments/environment';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {Section} from '../../../models/quiz/section.model';

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.styl']
})
export class QuizStartComponent implements OnInit {
  quiz = environment.quiz;
  questions: Question[];
  sections: Section[];
  sectionForm: FormGroup;

  constructor(
    public quizService: QuizService,
    private title: Title,
    private translate: TranslateService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.translate.get('quiz.start.title').subscribe(text => this.title.setTitle(text));
    this.questions = this.quizService.questions;
    this.sections = this.quizService.getSections();

    if (this.quizService.quizEnded) {
      this.quizService.quizStarted = false;
      this.quizService.quizEnded = false;
    }

    this.quizService.questionsChanged.subscribe(questions => {
      this.questions = questions;
    });

    this.initSectionForm();
  }

  onQuizStart(form: NgForm) {
    const showNumCorrectAnswers = form.value ? form.value.showNumCorrectAnswers : false;
    const randomQuestions = form.value ? form.value.randomQuestions : false;

    this.prepareQuestions(randomQuestions);

    this.quizService.showNumCorrectAnswers = showNumCorrectAnswers;
    this.quizService.quizStarted = true;
    this.quizService.quizEnded = false;

    this.quizService.moveToNextQuestion();
  }

  onQuizResume() {
    this.quizService.moveToNextQuestion();
  }

  initSectionForm() {
    this.sectionForm = this.formBuilder.group({
      sections: this.formBuilder.array([])
    });

    if (this.sections) {
      for (const s of this.sections) {
        const sectionArray = (this.sectionForm.get('sections')) as FormArray;
        sectionArray.push(this.formBuilder.group({
          id: s.id,
          title: s.title,
          isChecked: true
        }));
      }

      this.sectionForm.get('sections')
        .valueChanges.subscribe((sections) => {
        const filteredSections = sections
          .filter(section => section.isChecked)
          .map(section => section.id)
          .map(section => this.sections.find(s => s.id === section));

        this.quizService.filteredQuestions = this.questions
          .filter(question => {
            if (question.section) {
              return filteredSections.find(section => section.id === question.section.id);
            } else {
              return false;
            }
          })
          .slice();
      });
    }
  }

  prepareQuestions(random: boolean) {
    this.quizService.questionsCompleted = [];

    if (random) {
      this.quizService.questionsTodo = this.shuffle(this.quizService.filteredQuestions.slice());
    } else {
      this.quizService.questionsTodo = this.quizService.filteredQuestions.slice();
    }
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  getQuestionNumber(sectionId: string) {
    const section = this.sections.find(s => s.id === sectionId);
    return this.questions.filter(q => q.section.id === section.id).length;
  }

  getQuestionNumberStatus(sectionId: string) {
    const number = this.getQuestionNumber(sectionId);
    if (number < 1) {
      return 'quiz.start.sections.numOfQuestions.0';
    } else if (number === 1) {
      return 'quiz.start.sections.numOfQuestions.1';
    } else if (number === 2) {
      return 'quiz.start.sections.numOfQuestions.2';
    } else if (number === 3 || number === 4) {
      return 'quiz.start.sections.numOfQuestions.34';
    } else {
      return 'quiz.start.sections.numOfQuestions.plural';
    }
  }
}
