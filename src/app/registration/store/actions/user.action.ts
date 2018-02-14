import { Action } from '@ngrx/store';
import { User } from '../../../models/user';
import { Partner } from '../../../models/partner';
import { Institute } from '../../../models/institute';

// load user
export const LOAD_USER = '[User] Load User';
export const LOAD_USER_FAIL = '[User] Load User Fail';
export const LOAD_USER_SUCCESS = '[User] Load User Success';

// update user
export const UPDATE_INSTITUTES = '[User] Update Institutes';
export const UPDATE_NOTES = '[User] Update Notes';

export class LoadUser implements Action {
  readonly type = LOAD_USER;
}
export class LoadUserSuccess implements Action {
  readonly type = LOAD_USER_SUCCESS;
  constructor(public payload: User) {}
}
export class LoadUserFail implements Action {
  readonly type = LOAD_USER_FAIL;
  constructor(public payload: any) {}
}

export class UpdateInstitutes implements Action {
  readonly type = UPDATE_INSTITUTES;
  constructor(public payload: Institute[]) {}
}
export class UpdateNotes implements Action {
  readonly type = UPDATE_NOTES;
  constructor(public payload: string) {}
}

export type UserAction =
  | LoadUser
  | LoadUserFail
  | LoadUserSuccess
  | UpdateInstitutes
  | UpdateNotes;
