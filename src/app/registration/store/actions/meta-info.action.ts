import { Action } from '@ngrx/store';
import { Registration } from '../../../models/registration';
import { MetaInfoState } from '../reducers/meta-info.reducer';

export const UPDATE_META_INFO = '[Registration] Update Meta Info';

export class UpdateMetaInfo implements Action {
  readonly type = UPDATE_META_INFO;
  constructor(public payload: MetaInfoState) {}
}

export type MetaInfoAction = UpdateMetaInfo;
