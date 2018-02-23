import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, take } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/combineLatest';

import * as fromRoot from '../../../store';
import * as metaInfoActions from '../actions/meta-info.action';
import * as userActions from '../actions/user.action';
import * as fromUser from '../selectors/user.selectors';
import * as fromSelectors from '../selectors';
import { ApiService } from '../../../services/api.service';
import { LOAD_USER_SUCCESS } from '../actions/user.action';
import { USER_TYPE } from '../../../models/user-type';
import { MetaInfoState } from '../reducers/meta-info.reducer';
import { Store } from '@ngrx/store';
import { PartnerState } from '../reducers/partner.reducer';
import { Observable } from 'rxjs/Observable';
import { UserState } from '../reducers/user.reducer';
import { Partner } from '../../../models/partner';
import { GlobalUserState } from '../../../store/reducers/global-user.reducer';
import { LoadUserSuccess } from '../index';
import {
  GLOBAL_USER_UPDATE,
  GlobalUserUpdate,
} from '../../../store/actions/global-user.action';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private metaStore: Store<MetaInfoState>,
    private partnerStore: Store<PartnerState>,
    private userStore: Store<UserState>,
    private globalUserStore: Store<GlobalUserState>
  ) {}

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
  loadUserSuccess$ = Observable.combineLatest(
    this.actions$.ofType(userActions.LOAD_USER_SUCCESS),
    this.actions$
      .ofType(GLOBAL_USER_UPDATE)
      .map(a => (<GlobalUserUpdate>a).payload)
  ).pipe(
    switchMap(([action, globalUser]) => {
      const user = (<LoadUserSuccess>action).payload;
      const userType = user.status;
      switch (userType) {
        case null: {
          if (globalUser) {
            user.login = globalUser.login;
            user.lastName = globalUser.lastName;
            user.firstName = globalUser.firstName;
            user.email = globalUser.email;
          }
          return [
            new metaInfoActions.UpdateUserType(USER_TYPE.NOT_REGISTERED),
            new userActions.UpdateUser(user),
          ];
        }
        case 'registrant': {
          return [new metaInfoActions.UpdateUserType(USER_TYPE.REGISTRANT)];
        }
        // TODO
      }
    })
  );

  @Effect()
  sendRegistration$ = this.actions$.ofType(userActions.SEND_REGISTRATION).pipe(
    switchMap(() =>
      Observable.combineLatest(
        this.metaStore.select(fromSelectors.getMetaInfoState),
        this.partnerStore.select(fromSelectors.getPartner),
        this.userStore.select(fromSelectors.getUser)
      )
    ),
    take(1),
    switchMap(([metaInfo, partner, user]) => {
      user.graduation = metaInfo.graduation;
      user.institutes = metaInfo.selectedInstitutes;
      user.partner = partner ? Partner.fromApiType(partner.toApiType()) : null;
      return this.apiService
        .postUser(user)
        .pipe(
          map(u => new userActions.SendRegistrationSuccess(u)),
          catchError(error => of(new userActions.SendRegistrationFail(error)))
        );
    })
  );
}
