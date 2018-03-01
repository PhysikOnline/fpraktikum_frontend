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
  constructor() {}

  ngOnInit() {}
}
