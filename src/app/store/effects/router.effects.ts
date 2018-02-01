import { Injectable } from '@angular/core';

import * as RouterActions from '../actions/router.action';
import { Actions, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private loaction: Location
  ) {}

  @Effect({ dispatch: false })
  navigate$ = this.actions$.ofType(RouterActions.GO).pipe(
    map((action: RouterActions.Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$
    .ofType(RouterActions.BACK)
    .pipe(tap(() => this.loaction.back));

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$
    .ofType(RouterActions.FORWARD)
    .pipe(tap(() => this.loaction.forward));
}
