import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';
import * as fromRegistration from './registration.reducer';
import * as fromMetaInfo from './meta-info.reducer';
import * as fromPartner from './partner.reducer';

export interface RegistrationState {
  user: fromUser.UserState;
  registration: fromRegistration.RegistrationInfoState;
  metaInfo: fromMetaInfo.MetaInfoState;
  partner: fromPartner.PartnerState;
}

export const reducer: ActionReducerMap<RegistrationState> = {
  user: fromUser.reducer,
  registration: fromRegistration.reducer,
  metaInfo: fromMetaInfo.reducer,
  partner: fromPartner.reducer,
};

export const getRegistrationState = createFeatureSelector<RegistrationState>(
  'registration'
);
