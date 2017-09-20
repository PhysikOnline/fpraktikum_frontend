import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { User } from '../../models/user';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Institute } from '../../models/institute';
import { AlertService } from '../../services/alert.service';
import { RegistrationCompleteComponent } from '../registration-complete/registration-complete.component';
import { ChosenPartner } from '../../models/chosen-partner';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

const TOTAL_NUMBER_OF_STEPS = 5;

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  animations: [
    trigger('stepState', [
      state('inactive', style({
        display: 'none',
        transform: 'translate(100%)'
      })),
      state('active', style({
        display: 'block',
        transform: 'translate(0)'
      })),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('300ms ease-out'))
    ])
  ]
})
export class RegistrationFormComponent implements OnInit {

  user: User;
  institutes: Institute[];
  semester: string;
  graduationsArray: string[];
  partner: {
    lastName: string,
    sNumber: string,
  } = {lastName: null, sNumber: null};
  onlyOneInstitute = false;

  public partnerKeyUp = new Subject<string>();
  checkingPartnerSub: Subscription;
  checkingPartner = false;
  fixInstitutes = false;

  submittingSub: Subscription;
  submitting = false;

  stepStates = Array.from(Array(TOTAL_NUMBER_OF_STEPS)).map(e => 'inactive');
  progress = Array.from(Array(TOTAL_NUMBER_OF_STEPS)).map((e, index) => 100 / TOTAL_NUMBER_OF_STEPS * (index + 1));

  constructor(public registrationService: RegistrationService,
              private alert: AlertService) {
  }

  ngOnInit() {
    this.user = this.registrationService.user;
    this.semester = this.registrationService.semester;
    this.institutes = this.registrationService.institutes;
    this.graduationsArray = this.registrationService.graduationAvailable;
    this.partnerKeyUp.debounceTime(500).subscribe(() => this.checkPartner());
  }

  startRegistration() {
    this.resetRegistration();
    this.stepStates[0] = 'active';
  }

  wasPartnerEntered() {
    return !!this.partner.lastName && !!this.partner.sNumber;
  }

  resetPartner() {
    this.partner.lastName = null;
    this.partner.sNumber = null;
    this.registrationService.deletePartner();
  }

  checkPartner() {
    if (this.checkingPartnerSub) {
      this.checkingPartnerSub.unsubscribe();
    }
    if (this.isPartnerSameAsUser()) {
      this.registrationService.partnerStatus = ChosenPartner.sameAsUser;
      return;
    }
    if (this.wasPartnerEntered()) {
      this.checkingPartner = true;
      this.fixInstitutes = false;
      this.checkingPartnerSub = this.registrationService.checkPartner(this.partner.lastName, this.partner.sNumber)
        .subscribe(() => {
        if (this.registrationService.partnerStatus === ChosenPartner.registeredAndFree) {
          this.fixInstitutes = true;
        }
        this.checkingPartner = false;
      }, () => this.checkingPartner = false);
    } else {
      this.checkingPartner = false;
    }
  }

  isPartnerSameAsUser() {
    return this.user.login === this.partner.sNumber;
  }

  isPartnerOk() {
    return this.registrationService.partnerStatus === ChosenPartner.registeredAndFree
      || this.registrationService.partnerStatus === ChosenPartner.notRegistered;
  }

  partnerStepNext(index: number) {
    if (this.isPartnerOk()) {
      this.registrationService.savePartner();
    }
    this.advanceOneStep(index);
  }

  advanceOneStep(index) {
    if (index === this.stepStates.length) {
      this.registrationEnd();
    } else {
      this.toggleStep(index);
    }
  }

  registrationEnd() {
    this.submitting = true;
    this.submittingSub = this.registrationService.registerUser().subscribe(() => {
      this.alert.showDialog(RegistrationCompleteComponent, {});
      this.submitting = false;
    }, error => {
      this.submitting = false;
    });
  }

  toggleStep(index) {
    this.stepStates[index] = this.stepStates[index] === 'active' ? 'inactive' : 'active';
  }

  instituteChange(instituteEvent) {
    const institute: Institute = instituteEvent.value;
    const instituteOfSameHalf = this.user.institutes.find(i => i.semesterHalf === institute.semesterHalf);
    if (instituteOfSameHalf) {
      this.user.institutes[this.user.institutes.indexOf(instituteOfSameHalf)] = institute;
    } else {
      this.user.institutes.push(institute);
    }
    console.log(this.user.institutes);
  }

  shouldOptionBeDisabled(instituteName, semesterHalf) {
    const institute = this.institutes.find(i => i.name === instituteName && i.semesterHalf === semesterHalf && i.graduation === this.user.graduation);
    if (institute && !this.hasInstituteEnoughPlaces(institute)) {
      return true;
    }
    const otherSemesterHalf = semesterHalf % 2 + 1;
    const otherInstitute = this.findInstituteByHalf(otherSemesterHalf);
    if (this.canSelectOnlyOneInstitute()) {
      return !!otherInstitute;
    }
    return otherInstitute && otherInstitute.name === instituteName;
  }

  findInstituteByHalf(semesterHalf) {
    return this.user.institutes.find(i => i.semesterHalf === semesterHalf);
  }

  hasInstituteEnoughPlaces(institute: Institute) {
    return institute.places >= this.placesNeeded();
  }

  placesNeeded() {
    return this.user.partner ? 2 : 1;
  }

  canSelectOnlyOneInstitute() {
    return this.needsOnlyOneInstitute() || this.onlyOneInstitute;
  }

  needsOnlyOneInstitute() {
    return this.user.graduation === 'L';
  }

  hasUserEnoughInstitutesSelected() {
    return this.user.institutes.length === this.numberOfInstitutesNeeded();
  }

  numberOfInstitutesNeeded() {
    return this.canSelectOnlyOneInstitute() ? 1 : 2;
  }

  graduationChange(graduationEvent) {
    this.resetRegistration();
    this.user.graduation = graduationEvent.value;
  }

  resetRegistration() {
    this.user.graduation = null;
    this.user.institutes = [];
  }
}
