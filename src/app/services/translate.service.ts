import { Injectable } from '@angular/core';
import { APP_TEXT } from '../../text.config';

/**
 * Service which stores the current language and takes an identifier and returns its content.
 * See text.config.ts for the contents.
 *
 * @author Lars Gröber
 */
@Injectable()
export class TranslateService {
  private _language = 'de';
  private _text = APP_TEXT;

  translate(name: string): string {
    const text = this._text[this.language][name];
    return text ? text : name;
  }

  get language(): string {
    return this._language;
  }

  set language(value: string) {
    this._language = value;
  }

  // used for easier test writing.
  set text(value) {
    this._text = value;
  }
}
