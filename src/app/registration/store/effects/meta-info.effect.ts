import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromRoot from '../../../store';
import * as registrationActions from '../actions/registration.action';
import * as metaInfoActions from '../actions/meta-info.action';
import * as metaInfoReducer from '../reducers/meta-info.reducer';
import * as userActions from '../actions/user.action';
import { ApiService } from '../../../services/api.service';
import { Observable } from 'rxjs/Observable';
import { MetaInfoState } from '../reducers/meta-info.reducer';
import { USER_TYPE } from '../../../models/user-type';
import { REGISTRATION_STEP } from '../../../models/registration-step';
import { UpdateRegistrationStep } from '../actions/meta-info.action';

@Injectable()
export class MetaInfoEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  showInfoPage$ = Observable.merge(
    this.actions$.ofType(metaInfoActions.UPDATE_META_INFO)
  ).pipe(
    map((action: metaInfoActions.UpdateMetaInfo) => {
      const userType = metaInfoReducer.getUserState(action.payload);
      const regStep = metaInfoReducer.getRegistrationStep(action.payload);
      switch (userType) {
        case USER_TYPE.NOT_REGISTERED: {
          return this.getRouterActionOnStep(regStep);
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
