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
} from '../store/index';
import { tap, take, filter, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class RegistrationGuard implements CanActivate {
  constructor(private store: Store<RegistrationState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore() {
    return Observable.combineLatest(
      this.store.select(getRegistrationInfoLoaded),
      this.store.select(getUserLoaded)
    ).pipe(
      tap(([regLoaded, userLoaded]) => {
        if (!regLoaded) {
          this.store.dispatch(new LoadRegistrationInfo());
        }
        if (!userLoaded) {
          this.store.dispatch(new LoadUser());
        }
      }),
      filter(([regLoaded, userLoaded]) => regLoaded && userLoaded),
      take(1)
    );
  }
}
