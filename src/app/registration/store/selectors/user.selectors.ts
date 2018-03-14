import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as fromFeature from '../reducers';
import * as fromUser from '../reducers/user.reducer';

export const getUserState = createSelector(
  fromFeature.getRegistrationState,
  (state: fromFeature.RegistrationState) => state.user
);

export const getUser = createSelector(getUserState, fromUser.getUser);
export const getUserLoaded = createSelector(
  getUserState,
  fromUser.getUserLoaded
);
export const getUserLoading = createSelector(
  getUserState,
  fromUser.getUserLoading
);
