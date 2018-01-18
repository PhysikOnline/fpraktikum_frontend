import { ActionReducerMap } from '@ngrx/store';
import * as fromUser from './user.reducer';

export interface RegistrationState {
  user: fromUser.UserState;
}

export const reducer: ActionReducerMap<RegistrationState> = {
  user: fromUser.reducer,
};
