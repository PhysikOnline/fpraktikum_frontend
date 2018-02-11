import * as fromMetaInfo from '../actions/meta-info.action';

import { USER_TYPE } from '../../../models/user-type';
import { REGISTRATION_STEP } from '../../../models/registration-step';
import { UPDATE_REG_STEP } from '../actions/meta-info.action';

export interface MetaInfoState {
  graduation?: string;
  hasCompletedBioModule?: boolean;
  isMasterIT?: boolean;
  userType: USER_TYPE;
  registrationStep: REGISTRATION_STEP;
}

export const initialState: MetaInfoState = {
  graduation: null,
  hasCompletedBioModule: null,
  isMasterIT: null,
  userType: null,
  registrationStep: REGISTRATION_STEP.INFO,
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
      };
    }
    case fromMetaInfo.UPDATE_REG_STEP: {
      return {
        ...state,
        registrationStep: action.payload,
      };
    }
    case fromMetaInfo.UPDATE_MASTER_IT: {
      return {
        ...state,
        isMasterIT: action.payload,
      };
    }
    case fromMetaInfo.UPDATE_BIO_MODULE: {
      return {
        ...state,
        hasCompletedBioModule: action.payload,
      };
    }
    case fromMetaInfo.UPDATE_USER_TYPE: {
      return {
        ...state,
        userType: action.payload,
      };
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
