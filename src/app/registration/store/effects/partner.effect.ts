import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { ApiService } from '../../../services/api.service';
import { LOAD_USER_SUCCESS } from '../actions/user.action';
import { USER_TYPE } from '../../../models/user-type';
import {
  CHECK_PARTNER,
  CheckPartner,
  CheckPartnerSuccess,
  CheckPartnerFail,
} from '../actions/partner.action';

@Injectable()
export class PartnerEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  @Effect()
  loadUser$ = this.actions$.ofType(CHECK_PARTNER).pipe(
    switchMap(a => {
      const p = (<CheckPartner>a).payload;
      return this.apiService
        .checkPartner(p.name, p.number)
        .pipe(
          map(partner => new CheckPartnerSuccess(partner)),
          catchError(error => of(new CheckPartnerFail(error)))
        );
    })
  );
}
