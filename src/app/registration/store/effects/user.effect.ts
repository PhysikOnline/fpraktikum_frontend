import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromRoot from '../../../store';
import * as metaInfoActions from '../actions/meta-info.action';
import * as userActions from '../actions/user.action';
import * as fromUser from '../selectors/user.selectors';
import { ApiService } from '../../../services/api.service';
import { LOAD_USER_SUCCESS } from '../actions/user.action';
import { USER_TYPE } from '../../../models/user-type';

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

  @Effect()
  loadUserSuccess$ = this.actions$.ofType(userActions.LOAD_USER_SUCCESS).pipe(
    map((action: userActions.LoadUserSuccess) => {
      const userType = action.payload.status;
      switch (userType) {
        case null: {
          return new metaInfoActions.UpdateUserType(USER_TYPE.NOT_REGISTERED);
        }
        case 'registered': {
          return new metaInfoActions.UpdateUserType(USER_TYPE.REGISTRANT);
        }
        // TODO
      }
    })
  );
}
