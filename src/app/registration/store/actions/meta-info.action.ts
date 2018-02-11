import { Action } from '@ngrx/store';
import { Registration } from '../../../models/registration';
import { MetaInfoState } from '../reducers/meta-info.reducer';
import { REGISTRATION_STEP } from '../../../models/registration-step';

export const UPDATE_META_INFO = '[Registration] Update Meta Info';
export const UPDATE_REG_STEP = '[Registration] Update Registration Step';

export class UpdateMetaInfo implements Action {
  readonly type = UPDATE_META_INFO;
  constructor(public payload: MetaInfoState) {}
}

export class UpdateRegistrationStep implements Action {
  readonly type = UPDATE_REG_STEP;
  constructor(public payload: REGISTRATION_STEP) {}
}

export type MetaInfoAction = UpdateMetaInfo | UpdateRegistrationStep;
