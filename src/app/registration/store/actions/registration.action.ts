import { Action } from '@ngrx/store';
import { Registration } from '../../../models/registration';
import { User } from '../../../models/user';

export const LOAD_REGISTRATION_INFO = '[Registration] Load Registration';
export const LOAD_REGISTRATION_INFO_SUCCESS =
  '[Registration] Load Registration Success';
export const LOAD_REGISTRATION_INFO_FAIL =
  '[Registration] Load Registration Fail';

export const NOT_ENOUGH_PLACES = '[Registration] Not Enough Places';

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

export class NotEnoughPlaces implements Action {
  readonly type = NOT_ENOUGH_PLACES;
}

export type RegistrationInfoAction =
  | LoadRegistrationInfo
  | LoadRegistrationInfoSuccess
  | LoadRegisrationInfoFail
  | NotEnoughPlaces;
