import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store/src/store';
import { MetaInfoState } from '../store/reducers/meta-info.reducer';
import * as fromSelectors from '../store/selectors';

@Component({
  selector: 'app-registration-waitlist',
  templateUrl: './registration-waitlist.component.html',
  styleUrls: ['./registration-waitlist.component.scss'],
})
export class RegistrationWaitlistComponent implements OnInit {
  public readonly institutes = this.metaInfoStore.select(
    fromSelectors.getAvailableInstitutes
  );

  constructor(private metaInfoStore: Store<MetaInfoState>) {}

  ngOnInit() {}
}
