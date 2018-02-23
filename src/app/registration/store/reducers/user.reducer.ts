import * as fromUser from '../actions/user.action';
import { User } from '../../../models/user';

export interface UserState {
  data: User;
  loaded: boolean;
  loading: boolean;
}

export const initialState: UserState = {
  loaded: false,
  loading: false,
  data: new User('null'),
};

export function reducer(
  state = initialState,
  action: fromUser.UserAction
): UserState {
  switch (action.type) {
    case fromUser.LOAD_USER: {
      return {
        ...state,
        loading: true,
      };
    }
    case fromUser.LOAD_USER_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        loaded: true,
      };
    }
    case fromUser.LOAD_USER_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }
    case fromUser.UPDATE_INSTITUTES: {
      const user = state.data;
      user.institutes = action.payload;
      return {
        ...state,
        data: user,
      };
    }
    case fromUser.UPDATE_NOTES: {
      const user = state.data;
      user.notes = action.payload;
      return {
        ...state,
        data: user,
      };
    }
    case fromUser.UPDATE_USER: {
      return {
        ...state,
        data: action.payload,
      };
    }
  }
  return state;
}

export const getUserLoading = (state: UserState) => state.loading;
export const getUserLoaded = (state: UserState) => state.loaded;
export const getUser = (state: UserState) => state.data;
