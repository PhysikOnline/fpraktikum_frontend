import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { InTime } from './models/in-time';
import { DateService } from './services/date.service';
import { Store } from '@ngrx/store/src/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showView = true;
  inTime: InTime = InTime.inTime;
  inTimeEnum = InTime;

  constructor() {}

  private isInTime(date) {
    const now = DateService.now();
    if (now < date.start) {
      this.inTime = InTime.tooEarly;
    }
    if (now > date.end) {
      this.inTime = InTime.tooLate;
    }
  }

  ngOnInit() {}
}
