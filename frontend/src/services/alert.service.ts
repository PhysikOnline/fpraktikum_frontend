import { Injectable } from '@angular/core';
import { MdDialog, MdSnackBar } from '@angular/material';
import { TranslateService } from './translate.service';
import { QuestionDialogComponent } from '../app/question-dialog/question-dialog.component';

@Injectable()
export class AlertService {

  constructor(private snackBar: MdSnackBar,
              private dialog: MdDialog,
              private translateService: TranslateService) {
  }

  showSnack(text: string, code = 1) {
    const duration = code === 0 ? 9000 : 5000;
    this.snackBar.open(this.translateService.translate(text), this.translateService.translate('CLOSE'), {
      duration: duration,
    });
  }

  showDialog(component: any, data: any): Promise<any> {
    return new Promise((res, rej) => {
      const dialog = this.dialog.open(component, {
        data: data,
        disableClose: true
      });
      dialog.afterClosed().subscribe(result => {
        res(result);
      });
    });
  }

  showQuestionDialog(title: string, content?: string): Promise<any> {
    return this.showDialog(QuestionDialogComponent, {
      questionTitle: title,
      questionContent: content,
    });
  }

  showError(error) {
    this.showSnack(error, 0);
  }
}
