import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MetaInfoState } from '../store/reducers/meta-info.reducer';
import * as userActions from '../store/actions/user.action';
import * as fromSelectors from '../store/selectors';
import { BehaviorSubject } from 'rxjs';
import { Institute } from '../../models/institute';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { GRADUATION } from '../../../config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { RegistrationState } from '../store/index';
import { switchMap } from 'rxjs/operators/switchMap';

@Component({
  selector: 'app-registration-waitlist',
  templateUrl: './registration-waitlist.component.html',
  styleUrls: ['./registration-waitlist.component.scss'],
})
export class RegistrationWaitlistComponent implements OnInit {
  notes: string;

  public readonly institutes = this.metaInfoStore.select(
    fromSelectors.getAvailableInstitutes
  );

  public readonly allInstitutes = this.regStore.select(
    fromSelectors.getInstitutes
  ).pipe(
    switchMap(institutes => this.graduation.map(g => institutes.filter(i => i.graduation === g)))
  );

  public readonly graduation = this.metaInfoStore.select(
    fromSelectors.getGraduation
  );

  public readonly institutesSelected = new BehaviorSubject<Institute[]>([]);
  public readonly notesInput = new Subject<string>();

  public institutesOk: Observable<boolean> = combineLatest(
    this.graduation,
    this.institutesSelected
  ).pipe(
    map(
      ([graduation, institutes]) =>
        institutes.length === (graduation === GRADUATION.LA ? 1 : 2)
    )
  );

  constructor(
    private metaInfoStore: Store<MetaInfoState>,
    private regStore: Store<RegistrationState>
  ) {
    this.notesInput
      .debounceTime(300)
      .subscribe(() =>
        this.metaInfoStore.dispatch(new userActions.UpdateNotes(this.notes))
      );
  }

  send() {
    this.institutesSelected.subscribe(institutes => {
      this.metaInfoStore.dispatch(new userActions.SendWaitlist(institutes));
    });
  }

  ngOnInit() {}
}
