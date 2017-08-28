import { Injectable } from '@angular/core';
import { MdDialog, MdSnackBar } from '@angular/material';
import { TranslateService } from './translate.service';

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

  showDialog(component: any, data: any): Promise<{}> {
    return new Promise((res, rej) => {
      const dialog = this.dialog.open(component, {
        data: data
      });
      dialog.afterClosed().subscribe(result => {
        res();
      });
    });
  }
}
