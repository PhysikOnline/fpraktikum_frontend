import { Component, OnInit } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { RegistrationInfoState } from '../store/reducers/registration.reducer';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { UserState } from '../store/reducers/user.reducer';

import * as fromStore from '../store';
import { Registration } from '../../models/registration';

@Component({
  selector: 'app-registration-info',
  templateUrl: './registration-info.component.html',
  styleUrls: ['./registration-info.component.scss'],
})
export class RegistrationInfoComponent implements OnInit {
  user$: Observable<User> = this.userStore.select(fromStore.getUser);

  registration$: Observable<Registration> = this.regInfoStore.select(
    fromStore.getRegistrationInfo
  );

  startBtn$: Observable<{
    text: string;
    active: boolean;
  }> = this.registration$.map((reg: Registration) => {
    const now = new Date();
    let text = "Los geht's";
    let active = true;
    if (reg.startDate > now) {
      text = 'Anmeldung hat noch nicht begonnen.';
      active = false;
    } else if (reg.endDate < now) {
      text = 'Anmeldung ist bereits beendet.';
      active = false;
    }
    return {
      text,
      active,
    };
  });

  constructor(
    private regInfoStore: Store<RegistrationInfoState>,
    private userStore: Store<UserState>
  ) {}

  ngOnInit() {}
}
