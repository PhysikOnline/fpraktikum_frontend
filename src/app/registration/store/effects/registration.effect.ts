import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap, tap } from 'rxjs/operators';
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
import { REGISTRATION_STEP } from '../../../models/registration-step';

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

  @Effect({ dispatch: false })
  showError$ = Observable.merge(
    this.actions$.ofType(registrationActions.LOAD_REGISTRATION_INFO_FAIL),
    this.actions$.ofType(userActions.LOAD_USER_FAIL)
  ).pipe(
    tap(action => {
      console.error(action);
    })
  );
}
