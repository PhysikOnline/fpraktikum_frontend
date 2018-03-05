import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';

import * as fromRoot from '../../../store';
import * as registrationActions from '../actions/registration.action';
import * as registrationSelectors from '../selectors/registration.selectors';
import * as metaInfoSelectors from '../selectors/meta-info.selectors';
import * as partnerSelectors from '../selectors/partner.selectors';
import * as metaInfoActions from '../actions/meta-info.action';
import * as metaInfoReducer from '../reducers/meta-info.reducer';
import * as userActions from '../actions/user.action';
import { ApiService } from '../../../services/api.service';
import { Observable } from 'rxjs/Observable';
import { MetaInfoState } from '../reducers/meta-info.reducer';
import { USER_TYPE } from '../../../models/user-type';
import { REGISTRATION_STEP } from '../../../models/registration-step';
import {
  UpdateRegistrationStep,
  UpdateGraduation,
  UpdateIsMasterIT,
} from '../actions/meta-info.action';
import { Store } from '@ngrx/store';
import { RegistrationInfoState } from '../reducers/registration.reducer';
import { defaultIfEmpty } from 'rxjs/operators/defaultIfEmpty';
import { startWith } from 'rxjs/operators/startWith';
import { GRADUATION } from '../../../../config';
import { tap } from 'rxjs/operators/tap';
import { UpdateSelectedInstitutes } from '../index';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { PartnerState } from '../reducers/partner.reducer';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';

@Injectable()
export class MetaInfoEffects {
  constructor(
    private actions$: Actions,
    private metaInfoStore: Store<MetaInfoState>,
    private regStore: Store<RegistrationInfoState>,
    private partnerStore: Store<PartnerState>
  ) {}

  @Effect()
  showInfoPage$ = this.actions$.ofType(metaInfoActions.UPDATE_USER_TYPE).pipe(
    map((action: metaInfoActions.UpdateUserType) => {
      const userType = action.payload;
      switch (userType) {
        case USER_TYPE.NOT_REGISTERED: {
          return new fromRoot.Go({ path: ['registration', 'info'] });
        }
        default: {
          return new fromRoot.Go({ path: ['registration', 'info-registrant'] });
        }
      }
    })
  );

  @Effect()
  onRegStepChange$ = this.actions$.ofType(metaInfoActions.UPDATE_REG_STEP).pipe(
    map((action: UpdateRegistrationStep) => {
      return this.getRouterActionOnStep(action.payload);
    })
  );

  // set available institutes every time the required information changes
  @Effect()
  avInstitutes$ = Observable.combineLatest(
    this.actions$
      .ofType(metaInfoActions.UPDATE_BIO_MODULE)
      .pipe(map(a => (<metaInfoActions.UpdateHasCompletedBioModule>a).payload)),
    this.actions$
      .ofType(metaInfoActions.UPDATE_GRADUATION)
      .pipe(map(a => (<metaInfoActions.UpdateGraduation>a).payload)),
    this.actions$
      .ofType(metaInfoActions.UPDATE_MASTER_IT)
      .pipe(
        startWith(new metaInfoActions.UpdateIsMasterIT(false)),
        map(a => (<metaInfoActions.UpdateIsMasterIT>a).payload)
      ),
    this.actions$
      .ofType(registrationActions.LOAD_REGISTRATION_INFO_SUCCESS)
      .pipe(
        map(
          a =>
            (<registrationActions.LoadRegistrationInfoSuccess>a).payload
              .institutes
        )
      )
  ).pipe(
    map(([bio, graduation, masterIT, institutes]) => {
      const avInstitutes = institutes.filter(i => {
        if (graduation !== i.graduation) {
          return false;
        }
        if (!bio && i.name === 'IFB') {
          return false;
        }
        if (graduation === GRADUATION.MA && !masterIT && i.name === 'ITP') {
          return false;
        }
        return true;
      });
      return new metaInfoActions.UpdateAvailableInstitutes(avInstitutes);
    })
  );

  @Effect()
  onAvailableInstitutes$ = combineLatest(
    this.partnerStore.select(partnerSelectors.getPartner),
    this.actions$
      .ofType(metaInfoActions.UPDATE_AVAILABLE_INSTITUTE)
      .map((a: metaInfoActions.UpdateAvailableInstitutes) => a.payload)
  ).pipe(
    filter(([p, i]) => !!i && i.length > 0),
    withLatestFrom(this.metaInfoStore.select(metaInfoSelectors.getGraduation)),
    map(([[partner, availableInstitutes], graduation]) => {
      const placesNeeded = partner ? 2 : 1;
      let areEnoughPlacesAvailable = true;
      const freeInstitutes = availableInstitutes.filter(
        i => i.places >= placesNeeded
      );
      if (graduation === GRADUATION.LA) {
        areEnoughPlacesAvailable = availableInstitutes.some(
          i => i.places >= placesNeeded
        );
      } else {
        areEnoughPlacesAvailable =
          availableInstitutes
            .filter(i => i.semesterHalf === 1)
            .some(i => i.places >= placesNeeded) &&
          availableInstitutes
            .filter(i => i.semesterHalf === 2)
            .some(i => i.places >= placesNeeded);
      }

      return areEnoughPlacesAvailable
        ? new metaInfoActions.UpdateFreeInstitutes(freeInstitutes)
        : new registrationActions.NotEnoughPlaces();
    })
  );

  private getRouterActionOnStep(step: REGISTRATION_STEP) {
    switch (step) {
      case REGISTRATION_STEP.PREFLIGHT: {
        return new fromRoot.Go({ path: ['registration', 'preflight'] });
      }
      case REGISTRATION_STEP.MAIN: {
        return new fromRoot.Go({ path: ['registration', 'main'] });
      }
      case REGISTRATION_STEP.END: {
        return new fromRoot.Go({ path: ['registration', 'end'] });
      }
      case REGISTRATION_STEP.WAITLIST: {
        return new fromRoot.Go({ path: ['registration', 'waitlist'] });
      }
      default: {
        return new fromRoot.Go({ path: ['registration', 'info'] });
      }
    }
  }
}
