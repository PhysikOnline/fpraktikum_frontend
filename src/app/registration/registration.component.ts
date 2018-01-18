import { Component, OnInit } from '@angular/core';
import * as fromStore from '../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  constructor(private store: Store<fromStore.RegistrationState>) {}

  ngOnInit() {
    this.store.select(fromStore.getUser).subscribe(console.log);
  }
}
