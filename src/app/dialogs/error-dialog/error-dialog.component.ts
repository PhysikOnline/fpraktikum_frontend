import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss'],
})
export class ErrorDialogComponent implements OnInit {
  error: any;
  title: string;
  content: string;
  errorPoints: string[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.error = data.error;
    this.content = data.content;
    this.title = data.isBackend ? 'ERROR_TITLE_BACKEND' : 'ERROR_TITLE_GENERIC';
    this.errorPoints = data.errorPoints ? data.errorPoints : [];
    for (const key in this.error) {
      if (this.error.hasOwnProperty(key) && key !== 'statusText') {
        const element = this.error[key];
        if (Array.isArray(element)) {
          this.errorPoints.push(...element);
        } else {
          this.errorPoints.push(element);
        }
      }
    }
  }

  ngOnInit() {}
}
