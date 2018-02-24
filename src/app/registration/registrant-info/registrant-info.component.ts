import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from '../store/reducers/user.reducer';
import { MetaInfoState } from '../store/reducers/meta-info.reducer';
import * as selectors from '../store/selectors';
import { USER_TYPE } from '../../models/user-type';
import { AlertService } from '../../services/alert.service';
import { Signout } from '../store/index';

@Component({
  selector: 'app-registrant-info',
  templateUrl: './registrant-info.component.html',
  styleUrls: ['./registrant-info.component.scss'],
})
export class RegistrantInfoComponent implements OnInit {
  public readonly userType = this.metaInfoStore.select(selectors.getUserType);
  public readonly metaInfo = this.metaInfoStore.select(
    selectors.getMetaInfoState
  );
  public readonly user = this.userStore.select(selectors.getUser);

  public readonly USER_TYPE = USER_TYPE;

  constructor(
    private userStore: Store<UserState>,
    private metaInfoStore: Store<MetaInfoState>,
    private alert: AlertService
  ) {}

  signout() {
    this.alert.showQuestionDialog('Wirklich abmelden?').then(res => {
      if (res) {
        this.userStore.dispatch(new Signout());
      }
    });
  }

  accept() {}

  deny() {}

  ngOnInit() {}
}
