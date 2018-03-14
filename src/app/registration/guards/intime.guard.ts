import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import {
  RegistrationState,
  getRegistrationInfoLoaded,
  LoadRegistrationInfo,
  getUserLoaded,
  LoadUser,
  getRegistrationInfo,
} from '../store/index';
import { tap, take, filter, switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { inTime } from '../../shared/in-time';
import { Registration } from '../../models/registration';
import { InTime } from '../../models/in-time';

@Injectable()
export class InTimeGuard implements CanActivate {
  constructor(private store: Store<RegistrationState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore();
  }

  checkStore() {
    return this.store
      .select(getRegistrationInfo)
      .pipe(
        map(
          (regInfo: Registration) =>
            inTime(regInfo.startDate, regInfo.endDate) === InTime.inTime
        ),
        take(1)
      );
  }
}
