import { Component, OnInit } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { RegistrationInfoState } from '../store/reducers/registration.reducer';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { UserState } from '../store/reducers/user.reducer';

import * as fromStore from '../store';
import { Registration } from '../../models/registration';
import { MetaInfoState } from '../store/reducers/meta-info.reducer';
import {
  MetaInfoAction,
  UpdateRegistrationStep,
} from '../store/actions/meta-info.action';
import { REGISTRATION_STEP } from '../../models/registration-step';
import { LoadingService } from '../../services/loading.service';
import { map, tap } from 'rxjs/operators';
import { GRADUATION } from '../../../config';

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

  institutes$ = this.registration$.pipe(
    map(reg => reg.institutes),
    map(institutes => {
      return {
        BA: Array.from(
          new Set(
            institutes
              .filter(i => i.graduation === GRADUATION.BA)
              .map(i => i.name)
          )
        ),
        MA: Array.from(
          new Set(
            institutes
              .filter(i => i.graduation === GRADUATION.MA)
              .map(i => i.name)
          )
        ),
        LA: Array.from(
          new Set(
            institutes
              .filter(i => i.graduation === GRADUATION.LA)
              .map(i => i.name)
          )
        ),
      };
    }),
    tap(console.log)
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

  startRegistration() {
    this.metaInfoStore.dispatch(
      new fromStore.UpdateRegistrationStep(REGISTRATION_STEP.PREFLIGHT)
    );
  }

  constructor(
    private regInfoStore: Store<RegistrationInfoState>,
    private userStore: Store<UserState>,
    private metaInfoStore: Store<MetaInfoState>,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {}
}
