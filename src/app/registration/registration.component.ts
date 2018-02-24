import { Component, OnInit } from '@angular/core';
import * as fromStore from './store';
import { Store } from '@ngrx/store';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  constructor(
    private store: Store<fromStore.RegistrationState>,
    public loadingService: LoadingService
  ) {}

  ngOnInit() {
    // this.store.dispatch(new fromStore.LoadUser());
    // this.store.dispatch(new fromStore.LoadRegistrationInfo());

    this.store.select(fromStore.getInstitutes).subscribe(console.log);
  }
}
