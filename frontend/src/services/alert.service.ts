import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { TranslateService } from './translate.service';

@Injectable()
export class AlertService {

  constructor(private snackBar: MdSnackBar, private translateService: TranslateService) {
  }

  showSnack(text: string, code = 1) {
    const duration = code === 0 ? 9000 : 3000;
    this.snackBar.open(this.translateService.translate(text), this.translateService.translate('SNACKBAR_CLOSE'), {
      duration: duration,
    });
  }
}
