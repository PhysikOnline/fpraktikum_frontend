import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-waitlist-dialog',
  templateUrl: './waitlist-dialog.component.html',
  styleUrls: ['./waitlist-dialog.component.scss'],
})
export class WaitlistDialogComponent implements OnInit {
  questionTitle: string;
  questionContent: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<WaitlistDialogComponent>
  ) {}

  close(result: boolean) {
    this.dialogRef.close(result);
  }

  ngOnInit() {}
}
