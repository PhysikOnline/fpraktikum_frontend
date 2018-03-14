import { Injectable } from '@angular/core';

import * as RouterActions from '../actions/router.action';
import { Actions, Effect } from '@ngrx/effects';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { RouterNavigationAction } from '@ngrx/router-store';
import { take } from 'rxjs/operators/take';
import { RouterStateUrl } from '../index';
import { GlobalUserUpdate, TokenUpdate } from '../actions/global-user.action';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class GlobalUserEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  initialGlobalUser$ = this.actions$.ofType('ROUTER_NAVIGATION').pipe(
    take(1),
    map(a => (<RouterNavigationAction<RouterStateUrl>>a).payload),
    switchMap(({ routerState, event }) => {
      const params = routerState.queryParams;
      const token = params['token'];
      const login = params['login'];
      const firstName = params['firstName'];
      const lastName = params['lastName'];
      const email = params['email'];
      const matrikel = params['matrikel'];
      return [
        new GlobalUserUpdate({
          login,
          firstName,
          lastName,
          email,
          matrikel,
        }),
        new TokenUpdate(token),
      ];
    })
  );
}
