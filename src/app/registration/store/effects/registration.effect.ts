import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromRoot from '../../../store';
import * as registrationActions from '../actions/registration.action';
import * as userActions from '../actions/user.action';
import * as metaInfoActions from '../actions/meta-info.action';
import { ApiService } from '../../../services/api.service';
import { Observable } from 'rxjs/Observable';
import { LoadUserSuccess } from '../actions/user.action';
import { User } from '../../../models/user';
import { LoadRegistrationInfoSuccess } from '../actions/registration.action';
import { USER_TYPE } from '../../../models/user-type';

@Injectable()
export class RegistrationInfoEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  @Effect()
  loadRegistration$ = this.actions$
    .ofType(registrationActions.LOAD_REGISTRATION_INFO)
    .pipe(
      switchMap(() => {
        return this.apiService
          .getRegistration()
          .pipe(
            map(
              reg => new registrationActions.LoadRegistrationInfoSuccess(reg)
            ),
            catchError(error =>
              of(new registrationActions.LoadRegisrationInfoFail(error))
            )
          );
      })
    );

  @Effect()
  showInfoPage$ = Observable.combineLatest(
    this.actions$.ofType(registrationActions.LOAD_REGISTRATION_INFO_SUCCESS),
    this.actions$.ofType(userActions.LOAD_USER_SUCCESS)
  ).pipe(
    map(([regAction, userAction]) => {
      const user: User = (<userActions.LoadUserSuccess>userAction).payload;
      const graduation = user.graduation;
      switch (user.status) {
        case null: {
          return new metaInfoActions.UpdateMetaInfo({
            graduation,
            userType: USER_TYPE.NOT_REGISTERED,
          });
        }
      }
    })
  );
}
