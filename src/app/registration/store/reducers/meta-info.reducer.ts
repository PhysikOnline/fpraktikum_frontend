import * as fromMetaInfo from '../actions/meta-info.action';

import { USER_TYPE } from '../../../models/user-type';
import { REGISTRATION_STEP } from '../../../models/registration-step';
import { UPDATE_REG_STEP } from '../actions/meta-info.action';
import { Institute } from '../../../models/institute';

export interface MetaInfoState {
  graduation?: string;
  hasCompletedBioModule?: boolean;
  isMasterIT?: boolean;
  userType: USER_TYPE;
  registrationStep: REGISTRATION_STEP;
  avInstitutes: Institute[];
  selectedInstitutes: Institute[];
  freeInstitutes: Institute[];
}

export const initialState: MetaInfoState = {
  graduation: null,
  hasCompletedBioModule: null,
  isMasterIT: null,
  userType: null,
  registrationStep: REGISTRATION_STEP.INFO,
  avInstitutes: [],
  selectedInstitutes: [],
  freeInstitutes: [],
};

export function reducer(
  state = initialState,
  action: fromMetaInfo.MetaInfoAction
): MetaInfoState {
  switch (action.type) {
    case fromMetaInfo.UPDATE_GRADUATION: {
      return {
        ...state,
        graduation: action.payload,
        selectedInstitutes: [],
        isMasterIT: null,
      };
    }
    case fromMetaInfo.UPDATE_REG_STEP: {
      return { ...state, registrationStep: action.payload };
    }
    case fromMetaInfo.UPDATE_MASTER_IT: {
      return { ...state, isMasterIT: action.payload, selectedInstitutes: [] };
    }
    case fromMetaInfo.UPDATE_BIO_MODULE: {
      return {
        ...state,
        hasCompletedBioModule: action.payload,
        selectedInstitutes: [],
      };
    }
    case fromMetaInfo.UPDATE_USER_TYPE: {
      return { ...state, userType: action.payload };
    }
    case fromMetaInfo.UPDATE_AVAILABLE_INSTITUTE: {
      return {
        ...state,
        avInstitutes: action.payload || [],
        selectedInstitutes: [],
      };
    }
    case fromMetaInfo.UPDATE_SELECTED_INSTITUTE: {
      return { ...state, selectedInstitutes: action.payload || [] };
    }
    case fromMetaInfo.UPDATE_FREE_INSTITUTE: {
      return { ...state, freeInstitutes: action.payload || [] };
    }
  }
  return state;
}

export const getGraduation = (state: MetaInfoState) => state.graduation;
export const getHasCompletedBioModule = (state: MetaInfoState) =>
  state.hasCompletedBioModule;
export const getIsMasterIt = (state: MetaInfoState) => state.isMasterIT;
export const getUserType = (state: MetaInfoState) => state.userType;
export const getRegistrationStep = (state: MetaInfoState) =>
  state.registrationStep;
export const getAvailableInstitutes = (state: MetaInfoState) =>
  state.avInstitutes;
export const getSelectedInstitutes = (state: MetaInfoState) =>
  state.selectedInstitutes;
export const getFreeInstitutes = (state: MetaInfoState) => state.freeInstitutes;
