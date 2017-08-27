import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../services/translate.service';

/**
 * Translation pipe, takes an identifier and replaces it with its translated content.
 * Content can be find in text.config.ts.
 *
 * @author Lars Gröber
 */
@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {

  constructor(private translate: TranslateService) {
  }

  transform(name: string, ...args: any[]): string {
    let text = this.translate.translate(name);
    args.forEach((a, i) => text = text.replace(new RegExp(`%${i}%`), a));
    return text;
  }
}
