import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss'],
})
export class ErrorDialogComponent implements OnInit {
  error: string;
  title: string;
  content: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.error = data.error;
    this.content = data.content;
    this.title = data.isBackend ? 'ERROR_TITLE_BACKEND' : 'ERROR_TITLE_GENERIC';
    // this.desc = data.isBackend ? 'ERROR_BACKEND_DESC' : '';
  }

  ngOnInit() {}
}
