import { Action } from '@ngrx/store';
import { Registration } from '../../../models/registration';
import { MetaInfoState } from '../reducers/meta-info.reducer';
import { REGISTRATION_STEP } from '../../../models/registration-step';
import { GRADUATION } from '../../../../config';
import { USER_TYPE } from '../../../models/user-type';

export const UPDATE_REG_STEP = '[Registration] Update Registration Step';
export const UPDATE_GRADUATION = '[Registration] Update Gradution';
export const UPDATE_MASTER_IT = '[Registration] Update Master IT';
export const UPDATE_BIO_MODULE = '[Registration] Update Bio Module';
export const UPDATE_USER_TYPE = '[Registration] Update User Type';

export class UpdateRegistrationStep implements Action {
  readonly type = UPDATE_REG_STEP;
  constructor(public payload: REGISTRATION_STEP) {}
}

export class UpdateIsMasterIT implements Action {
  readonly type = UPDATE_MASTER_IT;
  constructor(public payload: boolean) {}
}

export class UpdateGraduation implements Action {
  readonly type = UPDATE_GRADUATION;
  constructor(public payload: GRADUATION) {}
}

export class UpdateHasCompletedBioModule implements Action {
  readonly type = UPDATE_BIO_MODULE;
  constructor(public payload: boolean) {}
}

export class UpdateUserType implements Action {
  readonly type = UPDATE_USER_TYPE;
  constructor(public payload: USER_TYPE) {}
}

export type MetaInfoAction =
  | UpdateRegistrationStep
  | UpdateIsMasterIT
  | UpdateGraduation
  | UpdateHasCompletedBioModule
  | UpdateUserType;
