import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GRADUATION } from '../../../config';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { MetaInfoState } from '../store/reducers/meta-info.reducer';
import { Store } from '@ngrx/store';
import { UpdateRegistrationStep } from '../store/actions/meta-info.action';
import { REGISTRATION_STEP } from '../../models/registration-step';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { PartnerState } from '../store/reducers/partner.reducer';
import { UserState } from '../store/reducers/user.reducer';
import { debounceTime, filter } from 'rxjs/operators';

import * as selectors from '../store/selectors';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CheckPartner } from '../store/index';
import { RemovePartner } from '../store/actions/partner.action';
import { UpdateNotes } from '../store/actions/user.action';
import { ChosenPartner } from '../../models/chosen-partner';
import { Institute } from '../../models/institute';

@Component({
  selector: 'app-registration-form-main',
  templateUrl: './registration-form-main.component.html',
  styleUrls: ['./registration-form-main.component.scss'],
})
export class RegistrationFormMainComponent implements OnInit, OnDestroy {
  private sub = new Subscription();
  private set sink(sub: Subscription) {
    this.sub.add(sub);
  }

  readonly userGraduation = this.metaStore.select(selectors.getGraduation);
  readonly partner = this.partnerStore.map(selectors.getPartner);
  readonly partnerType = this.partnerStore.map(selectors.getPartnerType);

  readonly partnerAcceptable = this.partnerType.map(
    type => type === ChosenPartner.notRegistered
  );
  readonly chooseOnlyOneInstitute = this.userGraduation.map(
    g => g === GRADUATION.LA
  );

  readonly availableInstitutes = this.metaStore.select(
    selectors.getAvailableInstitutes
  );

  readonly selectedInstitutes = this.metaStore.map(
    selectors.getSelectedInstitutes
  );

  readonly partnerForm: FormGroup;
  institutesForm: FormGroup;
  readonly notesForm: FormGroup;

  readonly partnerInput = new Subject();
  readonly institutesSelected: ReplaySubject<Institute> = new ReplaySubject(1);
  readonly notesInput: ReplaySubject<void> = new ReplaySubject(1);

  readonly noPartner = new BehaviorSubject(false);

  constructor(
    private formBuilder: FormBuilder,
    private metaStore: Store<MetaInfoState>,
    private partnerStore: Store<PartnerState>,
    private userStore: Store<UserState>
  ) {
    this.partnerForm = formBuilder.group({
      partnerNumber: ['', Validators.required],
      partnerName: ['', Validators.required],
    });
    this.notesForm = formBuilder.group({
      notes: [''],
    });

    this.sink = this.chooseOnlyOneInstitute.subscribe(res => {
      if (res) {
        this.institutesForm = formBuilder.group({
          institutes: ['', Validators.required],
        });
      } else {
        this.institutesForm = formBuilder.group({
          institutes1: ['', Validators.required],
          institutes2: ['', Validators.required],
        });
      }
    });

    this.sink = this.institutesSelected.subscribe(institute => {});

    this.sink = this.partnerInput
      .pipe(filter(() => this.partnerForm.valid), debounceTime(500))
      .subscribe(() => {
        this.checkPartner();
      });
    this.sink = this.noPartner.subscribe(res => {
      if (res) {
        this.partnerStore.dispatch(new RemovePartner());
        this.partnerForm.reset();
        this.partnerForm.disable();
      } else {
        this.partnerForm.enable();
      }
    });
    this.sink = this.notesInput.pipe(debounceTime(500)).subscribe(() => {
      const notes = this.notesForm.get('notes').value;
      this.userStore.dispatch(new UpdateNotes(notes));
    });
    this.sink = this.institutesSelected.subscribe();
  }

  checkPartner() {
    const number = this.partnerForm.get('partnerNumber').value;
    const name = this.partnerForm.get('partnerName').value;

    this.partnerStore.dispatch(new CheckPartner({ number, name }));
  }

  startNextStep() {
    if (this.institutesForm.invalid) {
      return;
    }
    this.metaStore.dispatch(new UpdateRegistrationStep(REGISTRATION_STEP.END));
  }

  shouldOptionBeDisabled(instituteName, semesterHalf) {
    const otherHalf = (semesterHalf + 1) % 2 + 1;
    return this.selectedInstitutes.map(institutes =>
      institutes.find(
        i => i.name === instituteName && i.semesterHalf === otherHalf
      )
    );
  }

  ngOnInit() {}
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
