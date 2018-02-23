import {
  GlobalUserActions,
  GLOBAL_USER_UPDATE,
  TOKEN_UPDATE,
} from '../actions/global-user.action';
import { GlobalUser } from '../../models/global-user';

export interface GlobalUserState {
  token: string;
  data: GlobalUser;
}

export const initialState: GlobalUserState = {
  token: null,
  data: null,
};

export function reducer(
  state = initialState,
  action: GlobalUserActions
): GlobalUserState {
  switch (action.type) {
    case GLOBAL_USER_UPDATE: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case TOKEN_UPDATE: {
      return {
        ...state,
        token: action.payload,
      };
    }
  }
  return state;
}

export const getToken = (state: GlobalUserState) => state.token;
export const getUser = (state: GlobalUserState) => state.data;
