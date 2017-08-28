import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {
  content: string;
  title: string;
  desc: string;

  constructor(@Inject(MD_DIALOG_DATA) public data: any) {
    this.content = data.content;
    this.title = data.isBackend ? 'ERROR_TITLE_BACKEND' : 'ERROR_TITLE_GENERIC';
    this.desc = data.isBackend ? 'ERROR_BACKEND_DESC' : '';
  }

  ngOnInit() {
  }

}
