import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GRADUATION } from '../../../config';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { MetaInfoState } from '../store/reducers/meta-info.reducer';
import { Store } from '@ngrx/store';
import { UpdateRegistrationStep } from '../store/actions/meta-info.action';
import { REGISTRATION_STEP } from '../../models/registration-step';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { PartnerState } from '../store/reducers/partner.reducer';
import { UserState } from '../store/reducers/user.reducer';
import { debounceTime, filter, map } from 'rxjs/operators';

import * as selectors from '../store/selectors';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CheckPartner, UpdateSelectedInstitutes } from '../store/index';
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
  readonly partner = this.partnerStore.select(selectors.getPartner);
  readonly partnerType = this.partnerStore.select(selectors.getPartnerType);

  readonly chooseOnlyOneInstitute = this.userGraduation.map(
    g => g === GRADUATION.LA
  );

  readonly partnerAcceptable = new BehaviorSubject(false);

  readonly availableInstitutes = this.metaStore.select(
    selectors.getFreeInstitutes
  );

  readonly selectedInstitutes = this.metaStore.map(
    selectors.getSelectedInstitutes
  );

  // bit hacky...
  readonly canTakePartner = this.availableInstitutes.map(institutes => {
    return (
      institutes.filter(i => i.graduation === GRADUATION.LA && i.places >= 2)
        .length > 0 ||
      (institutes.filter(i => i.semesterHalf === 1 && i.places >= 2).length >
        0 &&
        institutes.filter(i => i.semesterHalf === 2 && i.places >= 2).length >
          0)
    );
  });

  readonly selectedInstitutesOk = Observable.combineLatest(
    this.chooseOnlyOneInstitute,
    this.selectedInstitutes
  ).pipe(map(([one, institutes]) => institutes.length === (one ? 1 : 2)));

  readonly partnerForm: FormGroup;
  readonly notesForm: FormGroup;
  readonly instituteForm: FormGroup;

  readonly partnerInput = new Subject();
  readonly notesInput: ReplaySubject<void> = new ReplaySubject(1);

  readonly noPartner = new BehaviorSubject(false);

  institutes: Institute[] = [];

  validatePartner(control: AbstractControl) {
    return this.partnerAcceptable.getValue() ? null : { partnerInvalid: true };
  }

  validateInstitutes(control: AbstractControl) {
    return this.selectedInstitutesOk.map(res => {
      return res ? null : { institutesInvalid: true };
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private metaStore: Store<MetaInfoState>,
    private partnerStore: Store<PartnerState>,
    private userStore: Store<UserState>
  ) {
    this.partnerForm = formBuilder.group({
      partnerNumber: [
        '',
        [Validators.required, this.validatePartner.bind(this)],
      ],
      partnerName: ['', [Validators.required, this.validatePartner.bind(this)]],
    });
    this.notesForm = formBuilder.group({
      notes: [''],
    });
    this.instituteForm = formBuilder.group({
      nop: ['', [], this.validateInstitutes.bind(this)],
    });
    this.userGraduation.subscribe(console.log);

    this.sink = this.partnerInput
      .pipe(debounceTime(500))
      .subscribe(this.checkPartner.bind(this));
    this.sink = this.noPartner.subscribe(this.onNoPartner.bind(this));
    this.sink = this.notesInput
      .pipe(debounceTime(500))
      .subscribe(this.onNotesUpdate.bind(this));

    this.sink = this.canTakePartner.subscribe(c => this.noPartner.next(!c));
    this.sink = this.partner.filter(p => !!p).subscribe(partner => {
      this.partnerForm.setValue({
        partnerNumber: partner.login,
        partnerName: partner.lastName,
      });
    });

    this.sink = this.partnerType
      .map(type => type === ChosenPartner.notRegistered)
      .subscribe(res => {
        this.partnerAcceptable.next(res);
        this.partnerForm.setValue(this.partnerForm.value);
      });
  }

  checkPartner() {
    const number = this.partnerForm.get('partnerNumber').value;
    const name = this.partnerForm.get('partnerName').value;

    if (number && name) {
      this.partnerStore.dispatch(new CheckPartner({ number, name }));
    }
  }

  private onNoPartner(res: boolean): void {
    if (res) {
      this.partnerStore.dispatch(new RemovePartner());
      this.partnerForm.reset();
      this.partnerForm.disable();
    } else {
      this.partnerForm.enable();
    }
  }

  private onNotesUpdate(): void {
    const notes = this.notesForm.get('notes').value;
    this.userStore.dispatch(new UpdateNotes(notes));
  }

  startNextStep() {
    this.metaStore.dispatch(new UpdateRegistrationStep(REGISTRATION_STEP.END));
  }

  public updateInstitutes(institutes: Institute[]): void {
    return this.metaStore.dispatch(new UpdateSelectedInstitutes(institutes));
  }

  resetInstitutes() {
    this.metaStore.dispatch(new UpdateSelectedInstitutes([]));
  }

  goBack() {
    this.metaStore.dispatch(
      new UpdateRegistrationStep(REGISTRATION_STEP.PREFLIGHT)
    );
  }

  ngOnInit() {}
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
