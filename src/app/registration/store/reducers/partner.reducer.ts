import * as fromPartner from '../actions/partner.action';
import { User } from '../../../models/user';
import { ChosenPartner } from '../../../models/chosen-partner';

export interface PartnerState {
  partner: User;
  partnerType: ChosenPartner;
  loaded: boolean;
  loading: boolean;
}

export const initialState: PartnerState = {
  loaded: false,
  partnerType: null,
  loading: false,
  partner: null,
};

export function reducer(
  state = initialState,
  action: fromPartner.PartnerAction
): PartnerState {
  switch (action.type) {
    case fromPartner.CHECK_PARTNER: {
      return { ...state, loading: true };
    }
    case fromPartner.CHECK_PARTNER_SUCCESS: {
      return {
        ...state,
        partner: action.payload,
        loading: false,
        loaded: true,
      };
    }
    case fromPartner.CHECK_PARTNER_FAIL: {
      return { ...state, loading: false, loaded: false };
    }
    case fromPartner.REMOVE_PARTNER: {
      return { ...state, partner: null, loading: false, loaded: true };
    }
    case fromPartner.CHANGE_PARTNER_TYPE: {
      return { ...state, partnerType: action.payload };
    }
  }
  return state;
}

export const getPartnerLoading = (state: PartnerState) => state.loading;
export const getPartnerLoaded = (state: PartnerState) => state.loaded;
export const getPartner = (state: PartnerState) => state.partner;
export const getPartnerType = (state: PartnerState) => state.partnerType;
