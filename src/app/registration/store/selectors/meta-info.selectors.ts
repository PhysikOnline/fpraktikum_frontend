import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as fromFeature from '../reducers';
import * as fromMetaInfo from '../reducers/meta-info.reducer';
import { Registration } from '../../../models/registration';

export const getMetaInfoState = createSelector(
  fromFeature.getRegistrationState,
  (state: fromFeature.RegistrationState) => state.metaInfo
);

export const getGraduation = createSelector(
  getMetaInfoState,
  fromMetaInfo.getGraduation
);

export const getHasCompletedBioModule = createSelector(
  getMetaInfoState,
  fromMetaInfo.getHasCompletedBioModule
);

export const getIsMasterIt = createSelector(
  getMetaInfoState,
  fromMetaInfo.getIsMasterIt
);

export const getUserType = createSelector(
  getMetaInfoState,
  fromMetaInfo.getUserType
);

export const getRegistrationStep = createSelector(
  getMetaInfoState,
  fromMetaInfo.getRegistrationStep
);

export const getAvailableInstitutes = createSelector(
  getMetaInfoState,
  fromMetaInfo.getAvailableInstitutes
);

export const getSelectedInstitutes = createSelector(
  getMetaInfoState,
  fromMetaInfo.getSelectedInstitutes
);

export const getFreeInstitutes = createSelector(
  getMetaInfoState,
  fromMetaInfo.getFreeInstitutes
);
