import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MetaInfoState } from '../store/reducers/meta-info.reducer';
import * as userActions from '../store/actions/user.action';
import * as fromSelectors from '../store/selectors';
import { BehaviorSubject } from 'rxjs';
import { Institute } from '../../models/institute';

@Component({
  selector: 'app-registration-waitlist',
  templateUrl: './registration-waitlist.component.html',
  styleUrls: ['./registration-waitlist.component.scss'],
})
export class RegistrationWaitlistComponent implements OnInit {
  public readonly institutes = this.metaInfoStore.select(
    fromSelectors.getAvailableInstitutes
  );

  public readonly graduation = this.metaInfoStore.select(
    fromSelectors.getGraduation
  );

  public readonly institutesSelected = new BehaviorSubject<Institute[]>([]);

  constructor(private metaInfoStore: Store<MetaInfoState>) {}

  send() {
    this.institutesSelected.subscribe(institutes => {
      this.metaInfoStore.dispatch(new userActions.SendWaitlist(institutes));
    });
  }

  ngOnInit() {}
}
