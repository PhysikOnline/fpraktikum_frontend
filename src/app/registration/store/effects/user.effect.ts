import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, take, tap, zip } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/combineLatest';

import * as fromRoot from '../../../store';
import * as metaInfoActions from '../actions/meta-info.action';
import * as userActions from '../actions/user.action';
import * as fromSelectors from '../selectors';
import { ApiService } from '../../../services/api.service';
import { LOAD_USER_SUCCESS } from '../actions/user.action';
import { USER_TYPE, UserType } from '../../../models/user-type';
import { MetaInfoState } from '../reducers/meta-info.reducer';
import { Store } from '@ngrx/store';
import { PartnerState } from '../reducers/partner.reducer';
import { Observable } from 'rxjs/Observable';
import { UserState } from '../reducers/user.reducer';
import { Partner } from '../../../models/partner';
import { GlobalUser } from '../../../models/global-user';
import { GlobalUserState } from '../../../store/reducers/global-user.reducer';
import {
  GLOBAL_USER_UPDATE,
  GlobalUserUpdate,
} from '../../../store/actions/global-user.action';
import { GRADUATION } from '../../../../config';
import { AlertService } from '../../../services/alert.service';
import { RegistrationCompleteComponent } from '../../../dialogs/registration-complete/registration-complete.component';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';
import { Institute } from '../../../models/institute';
import { User } from '../../../models/user';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private metaStore: Store<MetaInfoState>,
    private partnerStore: Store<PartnerState>,
    private userStore: Store<UserState>,
    private alert: AlertService
  ) {}

  @Effect()
  loadUser$ = Observable.combineLatest(
    this.actions$.ofType(userActions.LOAD_USER),
    this.actions$
      .ofType(GLOBAL_USER_UPDATE)
      .map(a => (<GlobalUserUpdate>a).payload)
  ).pipe(
    switchMap(([a, globalUser]) => {
      return this.apiService
        .getUser(globalUser.login)
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
    switchMap(
      ([action, globalUser]: [userActions.LoadUserSuccess, GlobalUser]) => {
        const user = action.payload;
        const userType = user.status;
        let appUserType;
        switch (userType) {
          case null: {
            if (globalUser) {
              user.login = globalUser.login;
              user.lastName = globalUser.lastName;
              user.firstName = globalUser.firstName;
              user.email = globalUser.email;
              user.matrikel = globalUser.matrikel;
            }
            appUserType = USER_TYPE.NOT_REGISTERED;
            break;
          }
          case 'partner': {
            if (user.hasAccepted) {
              appUserType = USER_TYPE.REGISTRANT;
            } else {
              appUserType = USER_TYPE.PARTNER;
            }
            break;
          }
          case 'waitlist': {
            appUserType = USER_TYPE.ON_WAITLIST;
            break;
          }
          default: {
            appUserType = USER_TYPE.REGISTRANT;
          }
        }
        return [
          new metaInfoActions.UpdateUserType(appUserType),
          new metaInfoActions.UpdateSelectedInstitutes(user.institutes),
          new metaInfoActions.UpdateGraduation(<GRADUATION>user.graduation),
          new userActions.UpdateUser(user),
        ];
      }
    )
  );

  @Effect()
  signout$ = this.actions$.ofType(userActions.SIGNOUT).pipe(
    withLatestFrom(
      this.userStore.select(fromSelectors.getUser),
      this.metaStore.select(fromSelectors.getUserType)
    ),
    switchMap(([action, user, userType]) => {
      if (userType === USER_TYPE.ON_WAITLIST) {
        return this.apiService
          .removeFromWaitinglist(user)
          .pipe(
            map(() => new userActions.SignoutSuccess()),
            catchError(error => of(new userActions.SignoutFail(error)))
          );
      }
      return this.apiService
        .signOut(user)
        .pipe(
          map(() => new userActions.SignoutSuccess()),
          catchError(error => of(new userActions.SignoutFail(error)))
        );
    })
  );

  @Effect()
  signoutSuccess$ = this.actions$
    .ofType(userActions.SIGNOUT_SUCCESS)
    .pipe(map(() => new userActions.LoadUser()));

  @Effect()
  waitlist$ = this.actions$.ofType(userActions.SEND_WAITLIST).pipe(
    map((a: userActions.SendWaitlist) => a.payload),
    withLatestFrom(
      Observable.combineLatest(
        this.metaStore.select(fromSelectors.getMetaInfoState),
        this.userStore.select(fromSelectors.getUser)
      )
    ),
    switchMap(([institutes, [metaInfo, user]]) => {
      user.institutes = institutes;
      user.graduation = metaInfo.graduation;
      if (user.graduation === GRADUATION.LA) {
        user.instituteFirstHalf = user.institutes[0].name;
        user.instituteSecondHalf = user.institutes[0].name;
      } else {
        user.instituteFirstHalf = user.institutes.find(
          i => i.semesterHalf === 1
        ).name;
        user.instituteSecondHalf = user.institutes.find(
          i => i.semesterHalf === 2
        ).name;
      }
      return this.apiService
        .writeOnWaitinglist(user)
        .pipe(
          map(res => new userActions.SendWaitlistSuccess(res)),
          catchError(error => of(new userActions.SendWaitlistFail(error)))
        );
    })
  );

  @Effect()
  waitlistSuccess$ = this.actions$
    .ofType(userActions.SEND_WAITLIST_SUCCESS)
    .pipe(
      tap(() => this.alert.showDialog(RegistrationCompleteComponent, {})),
      switchMap((action: userActions.SendWaitlistSuccess) => {
        const user = action.payload;
        user.status = 'waitlist';
        return [new userActions.LoadUserSuccess(user)];
      })
    );

  @Effect()
  sendRegistration$ = this.actions$.ofType(userActions.SEND_REGISTRATION).pipe(
    withLatestFrom(
      Observable.combineLatest(
        this.metaStore.select(fromSelectors.getMetaInfoState),
        this.partnerStore.select(fromSelectors.getPartner),
        this.userStore.select(fromSelectors.getUser)
      )
    ),
    map(r => r[1]),
    switchMap(([metaInfo, partner, user]) => {
      user.graduation = metaInfo.graduation;
      user.institutes = metaInfo.selectedInstitutes;
      user.partner = partner ? User.fromApiType(partner.toApiType()) : null;
      if (user.partner) {
        user.partner.institutes = user.institutes;
        user.partner.notes = user.notes;
      }
      return this.apiService
        .postUser(user)
        .pipe(
          map(u => new userActions.SendRegistrationSuccess(u)),
          catchError(error => of(new userActions.SendRegistrationFail(error)))
        );
    })
  );

  @Effect()
  sendRegistratonSuccess$ = this.actions$
    .ofType(userActions.SEND_REGISTRATION_SUCCESS)
    .pipe(
      tap(() => this.alert.showDialog(RegistrationCompleteComponent, {})),
      map(
        (action: userActions.SendRegistrationSuccess) =>
          new userActions.LoadUserSuccess(action.payload)
      )
    );

  @Effect()
  acceptPartner$ = this.actions$
    .ofType(userActions.ACCEPT_DENY_PARTNER)
    .pipe(
      map((a: userActions.AcceptDenyPartner) => a.payload),
      withLatestFrom(this.userStore.select(fromSelectors.getUser)),
      switchMap(([accept, user]) =>
        this.apiService
          .acceptDecline(user, accept)
          .pipe(
            map(() => new userActions.AcceptDenyPartnerSuccess()),
            catchError(error =>
              of(new userActions.AcceptDenyPartnerFail(error))
            )
          )
      )
    );

  @Effect()
  acceptPartnerSuccess$ = this.actions$
    .ofType(userActions.ACCEPT_DENY_PARTNER_SUCCESS)
    .pipe(map(() => new userActions.LoadUser()));
}
