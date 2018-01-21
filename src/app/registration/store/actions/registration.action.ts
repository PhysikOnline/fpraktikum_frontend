import { Action } from '@ngrx/store';
import { Registration } from '../../../models/registration';

export const LOAD_REGISTRATION = '[Registration] Load Registration';
export const LOAD_REGISTRATION_SUCCESS =
  '[Registration] Load Registration Success';
export const LOAD_REGISTRATION_FAIL = '[Registration] Load Registration Fail';

export class LoadRegisration implements Action {
  readonly type = LOAD_REGISTRATION;
}

export class LoadRegisrationSuccess implements Action {
  readonly type = LOAD_REGISTRATION_SUCCESS;
  constructor(public payload: Registration) {}
}

export class LoadRegisrationFail implements Action {
  readonly type = LOAD_REGISTRATION_FAIL;
  constructor(public payload: any) {}
}

export type RegistrationAction =
  | LoadRegisration
  | LoadRegisrationSuccess
  | LoadRegisrationFail;
