import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material';
import { InTime } from './models/in-time';
import { DateService } from './services/date.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  showView = false;
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
