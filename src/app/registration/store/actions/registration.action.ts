import { Action } from '@ngrx/store';
import { Registration } from '../../../models/registration';
import { User } from '../../../models/user';

export const LOAD_REGISTRATION_INFO = '[Registration] Load Registration';
export const LOAD_REGISTRATION_INFO_SUCCESS =
  '[Registration] Load Registration Success';
export const LOAD_REGISTRATION_INFO_FAIL =
  '[Registration] Load Registration Fail';

export const SEND_REGISTRATION = '[Registration] Send Registration';
export const SEND_REGISTRATION_SUCCESS =
  '[Registration] Send Registration Success';
export const SEND_REGISTRATION_FAIL = '[Registration] Send Registration Fail';

export class LoadRegistrationInfo implements Action {
  readonly type = LOAD_REGISTRATION_INFO;
}

export class LoadRegistrationInfoSuccess implements Action {
  readonly type = LOAD_REGISTRATION_INFO_SUCCESS;
  constructor(public payload: Registration) {}
}

export class LoadRegisrationInfoFail implements Action {
  readonly type = LOAD_REGISTRATION_INFO_FAIL;
  constructor(public payload: any) {}
}

export class SendRegistraton implements Action {
  readonly type = SEND_REGISTRATION;
}

export class SendRegistratonSuccess implements Action {
  readonly type = SEND_REGISTRATION_SUCCESS;
  constructor(public payload: User) {}
}

export class SendRegistratonFail implements Action {
  readonly type = SEND_REGISTRATION_FAIL;
  constructor(public payload: any) {}
}

export type RegistrationInfoAction =
  | LoadRegistrationInfo
  | LoadRegistrationInfoSuccess
  | LoadRegisrationInfoFail
  | SendRegistraton
  | SendRegistratonSuccess
  | SendRegistratonFail;
