import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';
import * as fromRegistration from './registration.reducer';

export interface RegistrationState {
  user: fromUser.UserState;
  registration: fromRegistration.RegistrationInfoState;
}

export const reducer: ActionReducerMap<RegistrationState> = {
  user: fromUser.reducer,
  registration: fromRegistration.reducer,
};

export const getRegistrationState = createFeatureSelector<RegistrationState>(
  'registration'
);
