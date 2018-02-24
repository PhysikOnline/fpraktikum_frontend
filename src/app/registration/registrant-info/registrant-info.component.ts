import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from '../store/reducers/user.reducer';
import { MetaInfoState } from '../store/reducers/meta-info.reducer';
import * as selectors from '../store/selectors';

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

  constructor(
    private userStore: Store<UserState>,
    private metaInfoStore: Store<MetaInfoState>
  ) {}

  ngOnInit() {}
}