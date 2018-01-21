import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as userActions from '../actions/user.action';
import { ApiService } from '../../services/api.service';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  @Effect()
  loadUser$ = this.actions$.ofType(userActions.LOAD_USER).pipe(
    switchMap(() => {
      return this.apiService
        .getUser('s0053274')
        .pipe(
          map(user => new userActions.LoadUserSuccess(user)),
          catchError(error => of(new userActions.LoadUserFail(error)))
        );
    })
  );
}
