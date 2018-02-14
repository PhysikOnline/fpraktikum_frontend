import * as fromPartner from '../actions/partner.action';
import { User } from '../../../models/user';

export interface PartnerState {
  data: User;
  loaded: boolean;
  loading: boolean;
}

export const initialState: PartnerState = {
  loaded: false,
  loading: false,
  data: null,
};

export function reducer(
  state = initialState,
  action: fromPartner.PartnerAction
): PartnerState {
  switch (action.type) {
    case fromPartner.CHECK_PARTNER: {
      return {
        ...state,
        loading: true,
      };
    }
    case fromPartner.CHECK_PARTNER_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        loaded: true,
      };
    }
    case fromPartner.CHECK_PARTNER_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }
    case fromPartner.REMOVE_PARTNER: {
      return {
        ...state,
        data: null,
        loading: false,
        loaded: true,
      };
    }
  }
  return state;
}

export const getPartnerLoading = (state: PartnerState) => state.loading;
export const getPartnerLoaded = (state: PartnerState) => state.loaded;
export const getPartner = (state: PartnerState) => state.data;
