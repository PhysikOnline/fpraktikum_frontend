import * as fromRegistration from '../actions/registration.action';
import { Registration } from '../../../models/registration';

export interface RegistrationInfoState {
  data: Registration;
  loaded: boolean;
  loading: boolean;
}

export const initialState: RegistrationInfoState = {
  loaded: false,
  loading: false,
  data: null,
};

export function reducer(
  state = initialState,
  action: fromRegistration.RegistrationAction
): RegistrationInfoState {
  switch (action.type) {
    case fromRegistration.LOAD_REGISTRATION: {
      return {
        ...state,
        loading: true,
      };
    }
    case fromRegistration.LOAD_REGISTRATION_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        loaded: true,
      };
    }
    case fromRegistration.LOAD_REGISTRATION_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }
  }
  return state;
}

export const getRegistrationLoading = (state: RegistrationInfoState) =>
  state.loading;
export const getRegistrationLoaded = (state: RegistrationInfoState) =>
  state.loaded;
export const getRegistration = (state: RegistrationInfoState) => state.data;
