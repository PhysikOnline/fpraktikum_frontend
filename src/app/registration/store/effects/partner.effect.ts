import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { ApiService } from '../../../services/api.service';
import { LOAD_USER_SUCCESS, LoadUserSuccess } from '../actions/user.action';
import { USER_TYPE, UserType } from '../../../models/user-type';
import { Observable } from 'rxjs/Observable';
import { ChangePartnerType } from '../actions/partner.action';
import { ChosenPartner } from '../../../models/chosen-partner';
import {
  CHECK_PARTNER,
  CHECK_PARTNER_SUCCESS,
  CHANGE_PARTNER_TYPE,
  CheckPartner,
  CheckPartnerSuccess,
  CheckPartnerFail,
} from '../actions/partner.action';
import { UPDATE_USER } from '../actions/user.action';
import { User } from '../../../models/user';

@Injectable()
export class PartnerEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  @Effect()
  loadPartner$ = this.actions$.ofType(CHECK_PARTNER).pipe(
    switchMap(a => {
      const p = (<CheckPartner>a).payload;
      return this.apiService.checkPartner(p.name, p.number).pipe(
        map(partner => new CheckPartnerSuccess(partner)),
        catchError(error => {
          return of(new CheckPartnerFail(error));
        })
      );
    })
  );

  @Effect()
  partnerType$ = Observable.combineLatest(
    this.actions$.ofType(CHECK_PARTNER_SUCCESS),
    this.actions$.ofType(CHECK_PARTNER),
    this.actions$.ofType(UPDATE_USER)
  ).pipe(
    map(
      ([p, c, u]) =>
        <[User, { number: string }, User]>[
          (<CheckPartnerSuccess>p).payload,
          (<CheckPartner>c).payload,
          (<LoadUserSuccess>u).payload,
        ]
    ),
    map(([partner, checkPartner, user]) => {
      if (!partner) {
        return new ChangePartnerType(ChosenPartner.doesNotExist);
      }
      if (partner.status === UserType.registrant) {
        return new ChangePartnerType(ChosenPartner.registeredAndFree);
      } else if (partner.graduation !== user.graduation) {
        return new ChangePartnerType(ChosenPartner.hasDifferentGraduation);
      } else if (
        partner.login === user.login ||
        checkPartner.number === user.login
      ) {
        return new ChangePartnerType(ChosenPartner.sameAsUser);
      } else if (partner.partner || partner.registrant) {
        return new ChangePartnerType(ChosenPartner.hasPartner);
      } else {
        return new ChangePartnerType(ChosenPartner.notRegistered);
      }
    })
  );
}
