import * as fromMetaInfo from '../actions/meta-info.action';

import { USER_TYPE } from '../../../models/user-type';

export interface MetaInfoState {
  graduation?: string;
  hasCompletedBioModule?: boolean;
  isMasterIT?: boolean;
  userType: USER_TYPE;
}

export const initialState: MetaInfoState = {
  graduation: null,
  hasCompletedBioModule: null,
  isMasterIT: null,
  userType: null,
};

export function reducer(
  state = initialState,
  action: fromMetaInfo.MetaInfoAction
): MetaInfoState {
  switch (action.type) {
    case fromMetaInfo.UPDATE_META_INFO: {
      return {
        ...state,
        ...action.payload,
      };
    }
  }
  return state;
}

export const getGraduation = (state: MetaInfoState) => state.graduation;
export const getHasCompletedBioModule = (state: MetaInfoState) =>
  state.hasCompletedBioModule;
export const getIsMasterIt = (state: MetaInfoState) => state.isMasterIT;
export const getUserState = (state: MetaInfoState) => state.userType;
