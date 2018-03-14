import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as fromFeature from '../reducers';
import * as fromRegistration from '../reducers/registration.reducer';
import { Registration } from '../../../models/registration';

export const getRegistrationInfoState = createSelector(
  fromFeature.getRegistrationState,
  (state: fromFeature.RegistrationState) => state.registration
);

export const getRegistrationInfo = createSelector(
  getRegistrationInfoState,
  fromRegistration.getRegistration
);

export const getInstitutes = createSelector(
  getRegistrationInfo,
  (registration: Registration) => (registration ? registration.institutes : [])
);

export const getRegistrationInfoLoaded = createSelector(
  getRegistrationInfoState,
  fromRegistration.getRegistrationLoaded
);

export const getRegistrationInfoLoading = createSelector(
  getRegistrationInfoState,
  fromRegistration.getRegistrationLoading
);
