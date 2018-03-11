import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { GRADUATION } from '../../../config';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AbstractControl } from '@angular/forms/src/model';
import { Store } from '@ngrx/store';
import { MetaInfoState } from '../store/reducers/meta-info.reducer';
import * as metaInfoActions from '../store/actions/meta-info.action';
import * as selectors from '../store/selectors';
import * as fromRoot from '../../store';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { UpdateHasCompletedBioModule } from '../store/actions/meta-info.action';
import { REGISTRATION_STEP } from '../../models/registration-step';
import { BehaviorSubject } from 'rxjs';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-registration-form-preflight',
  templateUrl: './registration-form-preflight.component.html',
  styleUrls: ['./registration-form-preflight.component.scss'],
})
export class RegistrationFormPreflightComponent implements OnInit, OnDestroy {
  private sub = new Subscription();
  private set sink(sub: Subscription) {
    this.sub.add(sub);
  }

  readonly userGraduation = this.metaStore.select(selectors.getGraduation);
  readonly userMasterIT = this.metaStore.select(selectors.getIsMasterIt);
  readonly userBio = this.metaStore.select(selectors.getHasCompletedBioModule);

  public readonly activeStep = new BehaviorSubject<number>(0);

  readonly graduation = GRADUATION;

  readonly graduationForm: FormGroup;
  readonly biologyForm: FormGroup;
  readonly masterITForm: FormGroup;

  readonly graduationSelected: ReplaySubject<GRADUATION> = new ReplaySubject(1);
  readonly masterITSelected: ReplaySubject<boolean> = new ReplaySubject(1);
  readonly biologySelected: ReplaySubject<boolean> = new ReplaySubject(1);

  readonly masterITRequired = this.userGraduation.map(g => g === GRADUATION.MA);

  constructor(
    private formBuilder: FormBuilder,
    private metaStore: Store<MetaInfoState>
  ) {
    this.userGraduation.subscribe(console.log);
    this.graduationForm = formBuilder.group({
      graduation: ['', Validators.required],
    });
    this.biologyForm = formBuilder.group({
      biology: ['', Validators.required],
    });
    this.masterITForm = formBuilder.group({
      masterIT: ['', Validators.required],
    });

    this.sink = this.masterITRequired.subscribe(res => {
      const ctrl = this.masterITForm.get('masterIT');
      if (res) {
        ctrl.enable();
      } else {
        ctrl.disable();
      }
    });

    this.sink = this.graduationSelected.subscribe(g =>
      this.metaStore.dispatch(new metaInfoActions.UpdateGraduation(g))
    );
    this.sink = this.masterITSelected.subscribe(m =>
      this.metaStore.dispatch(new metaInfoActions.UpdateIsMasterIT(m))
    );
    this.sink = this.biologySelected.subscribe(b =>
      this.metaStore.dispatch(
        new metaInfoActions.UpdateHasCompletedBioModule(b)
      )
    );
    this.sink = this.userGraduation.subscribe(graduation =>
      this.graduationForm.setValue({ graduation })
    );
    this.sink = this.userMasterIT.subscribe(masterIT =>
      this.masterITForm.setValue({ masterIT })
    );
    this.sink = this.userBio.subscribe(biology =>
      this.biologyForm.setValue({ biology })
    );
  }

  startNextStep() {
    if (this.biologyForm.invalid) {
      return;
    }
    this.metaStore.dispatch(
      new metaInfoActions.UpdateRegistrationStep(REGISTRATION_STEP.MAIN)
    );
  }

  goBack() {
    this.metaStore.dispatch(
      new metaInfoActions.UpdateRegistrationStep(REGISTRATION_STEP.INFO)
    );
  }

  onStepChange(event: StepperSelectionEvent) {
    if (event.selectedIndex === 1) {
      this.graduationSelected.pipe(
        take(1),
        tap((graduation) => {
          console.log(graduation)
          if (graduation !== GRADUATION.MA) {
            this.activeStep.next(2);
          }
        })
      ).subscribe();
    }
  }

  ngOnInit() {}
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
