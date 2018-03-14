import { Component, OnInit } from '@angular/core';
import * as fromUser from '../store/reducers/user.reducer';
import * as fromMetaInfo from '../store/reducers/meta-info.reducer';
import * as fromPartner from '../store/reducers/partner.reducer';
import * as fromSelectors from '../store/selectors';
import { Store } from '@ngrx/store';
import { USER_TYPE } from '../../models/user-type';
import { SendRegistration } from '../store/actions/user.action';
import { Go } from '../../store';
import { UpdateRegistrationStep } from '../store';
import { REGISTRATION_STEP } from '../../models/registration-step';

@Component({
  selector: 'app-registration-end',
  templateUrl: './registration-end.component.html',
  styleUrls: ['./registration-end.component.scss'],
})
export class RegistrationEndComponent implements OnInit {
  user = this.userStore.select(fromSelectors.getUser);
  metaInfo = this.metaStore.select(fromSelectors.getMetaInfoState);
  partner = this.partnerStore.select(fromSelectors.getPartner);

  constructor(
    private userStore: Store<fromUser.UserState>,
    private metaStore: Store<fromMetaInfo.MetaInfoState>,
    private partnerStore: Store<fromPartner.PartnerState>
  ) {}

  send() {
    this.userStore.dispatch(new SendRegistration());
  }

  goBack() {
    this.userStore.dispatch(new UpdateRegistrationStep(REGISTRATION_STEP.MAIN));
  }

  ngOnInit() {}
}
