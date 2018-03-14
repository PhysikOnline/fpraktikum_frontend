import { Action } from '@ngrx/store';
import { GlobalUser } from '../../models/global-user';

export const GLOBAL_USER_UPDATE = '[Global User] Update User';
export const TOKEN_UPDATE = '[Global User] Update Token';

export class GlobalUserUpdate implements Action {
  readonly type = GLOBAL_USER_UPDATE;
  constructor(public payload: GlobalUser) {}
}

export class TokenUpdate implements Action {
  readonly type = TOKEN_UPDATE;
  constructor(public payload: string) {}
}

export type GlobalUserActions = GlobalUserUpdate | TokenUpdate;
