import { Component, Inject, Input, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.scss']
})
export class QuestionDialogComponent implements OnInit {

  questionTitle: string;
  questionContent: string;

  constructor(@Inject(MD_DIALOG_DATA) public data: any, public dialogRef: MdDialogRef<QuestionDialogComponent>) {
    this.questionContent = data.questionContent;
    this.questionTitle = data.questionTitle;
  }

  close(result: boolean) {
    this.dialogRef.close(result);
  }

  ngOnInit() {
  }

}
