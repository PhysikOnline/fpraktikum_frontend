import { Injectable } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TranslateService } from './translate.service';
import { QuestionDialogComponent } from '../dialogs/question-dialog/question-dialog.component';
@Injectable()
export class AlertService {
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private translateService: TranslateService
  ) {}

  showSnack(text: string, code = 1) {
    const duration = code === 0 ? 9000 : 5000;
    this.snackBar.open(
      this.translateService.translate(text),
      this.translateService.translate('CLOSE'),
      {
        duration: duration,
      }
    );
  }

  showDialog(component: any, data: any, disableClose = true): Promise<any> {
    return new Promise((res, rej) => {
      const dialog = this.dialog.open(component, {
        data: data,
        disableClose: disableClose,
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
