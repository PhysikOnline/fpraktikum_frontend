import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as registrationActions from '../actions/registration.action';
import { ApiService } from '../../../services/api.service';

@Injectable()
export class RegistrationEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  @Effect()
  loadRegistration$ = this.actions$
    .ofType(registrationActions.LOAD_REGISTRATION)
    .pipe(
      switchMap(() => {
        return this.apiService
          .getRegistration()
          .pipe(
            map(reg => new registrationActions.LoadRegisrationSuccess(reg)),
            catchError(error =>
              of(new registrationActions.LoadRegisrationFail(error))
            )
          );
      })
    );
}
