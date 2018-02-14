import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';

import * as fromRoot from '../../../store';
import * as registrationActions from '../actions/registration.action';
import * as registrationSelectors from '../selectors/registration.selectors';
import * as metaInfoActions from '../actions/meta-info.action';
import * as metaInfoReducer from '../reducers/meta-info.reducer';
import * as userActions from '../actions/user.action';
import { ApiService } from '../../../services/api.service';
import { Observable } from 'rxjs/Observable';
import { MetaInfoState } from '../reducers/meta-info.reducer';
import { USER_TYPE } from '../../../models/user-type';
import { REGISTRATION_STEP } from '../../../models/registration-step';
import { UpdateRegistrationStep } from '../actions/meta-info.action';
import { Store } from '@ngrx/store';
import { RegistrationInfoState } from '../reducers/registration.reducer';

@Injectable()
export class MetaInfoEffects {
  constructor(
    private actions$: Actions,
    private metaInfoStore: Store<MetaInfoState>,
    private regStore: Store<RegistrationInfoState>
  ) {}

  @Effect()
  showInfoPage$ = Observable.merge(
    this.actions$.ofType(metaInfoActions.UPDATE_USER_TYPE)
  ).pipe(
    map((action: metaInfoActions.UpdateUserType) => {
      const userType = action.payload;
      switch (userType) {
        case USER_TYPE.NOT_REGISTERED: {
          return new fromRoot.Go({ path: ['registration', 'info'] });
        }
        case USER_TYPE.REGISTRANT: {
          return new fromRoot.Go({ path: ['registration', 'info-registrant'] });
        }
        case USER_TYPE.ON_WAITLIST: {
          return new fromRoot.Go({
            path: ['registration', 'info-on-waitlist'],
          });
        }
        case USER_TYPE.PARTNER: {
          return new fromRoot.Go({ path: ['registration', 'info-partner'] });
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

  @Effect({ dispatch: false })
  avInstitutes$ = Observable.combineLatest(
    this.actions$.ofType(metaInfoActions.UPDATE_BIO_MODULE),
    this.actions$.ofType(metaInfoActions.UPDATE_GRADUATION),
    this.actions$.ofType(metaInfoActions.UPDATE_MASTER_IT),
    this.regStore.map(registrationSelectors.getInstitutes)
  ).pipe(map(console.log));

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
      default: {
        return new fromRoot.Go({ path: ['registration', 'info'] });
      }
    }
  }
}
