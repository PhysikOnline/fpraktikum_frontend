import { Action } from '@ngrx/store';
import { User } from '../../../models/user';

// check partner
export const CHECK_PARTNER = '[Partner] Check Partner';
export const CHECK_PARTNER_FAIL = '[Partner] Check Partner Fail';
export const CHECK_PARTNER_SUCCESS = '[Partner] Check Partner Success';
export const REMOVE_PARTNER = '[Partner] Remove Partner';

export class CheckPartner implements Action {
  readonly type = CHECK_PARTNER;
  constructor(public payload: { number: string; name: string }) {}
}
export class CheckPartnerSuccess implements Action {
  readonly type = CHECK_PARTNER_SUCCESS;
  constructor(public payload: User) {}
}
export class CheckPartnerFail implements Action {
  readonly type = CHECK_PARTNER_FAIL;
  constructor(public payload: any) {}
}
export class RemovePartner implements Action {
  readonly type = REMOVE_PARTNER;
}

export type PartnerAction =
  | CheckPartner
  | CheckPartnerFail
  | CheckPartnerSuccess
  | RemovePartner;
