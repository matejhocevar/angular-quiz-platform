import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  constructor(
    private titleService: Title,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use(environment.language);
  }

  ngOnInit() {
    this.translate.get('name').subscribe(text => {console.log(text); return this.titleService.setTitle(text);});
  }
}
