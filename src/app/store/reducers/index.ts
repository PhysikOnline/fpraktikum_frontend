import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromUser from './user.reducer';

export interface RegistrationState {
  user: fromUser.UserState;
}

export const reducer: ActionReducerMap<RegistrationState> = {
  user: fromUser.reducer,
};

export const getRegistrationState = createFeatureSelector<RegistrationState>(
  'registration'
);

export const getUserState = createSelector(
  getRegistrationState,
  (state: RegistrationState) => state.user
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
