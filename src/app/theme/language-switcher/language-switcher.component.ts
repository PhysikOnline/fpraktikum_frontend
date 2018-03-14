import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

  switchLang(lang: string) {
    this.translate.language = lang;
  }
}
