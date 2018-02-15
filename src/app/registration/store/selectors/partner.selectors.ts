import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as fromFeature from '../reducers';
import * as fromPartner from '../reducers/partner.reducer';

export const getPartnerState = createSelector(
  fromFeature.getRegistrationState,
  (state: fromFeature.RegistrationState) => state.partner
);

export const getPartner = createSelector(
  getPartnerState,
  fromPartner.getPartner
);
export const getPartnerLoaded = createSelector(
  getPartnerState,
  fromPartner.getPartnerLoaded
);
export const getPartnerLoading = createSelector(
  getPartnerState,
  fromPartner.getPartnerLoading
);
export const getPartnerType = createSelector(
  getPartnerState,
  fromPartner.getPartnerType
);
