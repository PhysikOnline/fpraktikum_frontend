import { Injectable } from '@angular/core';

import * as RouterActions from '../actions/router.action';
import { Actions, Effect } from '@ngrx/effects';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  @Effect({ dispatch: false })
  navigate$ = Observable.combineLatest(
    this.actions$
      .ofType(RouterActions.GO)
      .pipe(map((action: RouterActions.Go) => action.payload)),
    this.route.queryParams
  ).pipe(
    tap(([{ path, query: queryParams, extras }, origParams]) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$
    .ofType(RouterActions.BACK)
    .pipe(tap(() => this.location.back));

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$
    .ofType(RouterActions.FORWARD)
    .pipe(tap(() => this.location.forward));
}
