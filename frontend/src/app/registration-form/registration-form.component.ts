import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { User } from '../../models/user';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Institute } from '../../models/institute';
import { AlertService } from '../../services/alert.service';
import { RegistrationCompleteComponent } from '../registration-complete/registration-complete.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { Partner } from '../../models/partner';
import { ChosenPartner } from '../../models/chosen-partner';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

const TOTAL_NUMBER_OF_STEPS = 4;

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
    ]),
    trigger('blur', [
      state('void', style({
        transform: 'opacity(0)'
      })),
      state('*', style({
        transform: 'opacity(100)'
      })),
      transition('void => *', animate('300ms ease-in')),
      transition('* => void', animate('300ms ease-out'))
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

  checkingPartnerSub: Subscription;
  checkingPartner = false;

  submittingSub: Subscription;
  submitting = false;

  stepStates = Array.from(Array(TOTAL_NUMBER_OF_STEPS)).map(e => 'inactive');
  progress = Array.from(Array(TOTAL_NUMBER_OF_STEPS)).map((e, index) => 100 / TOTAL_NUMBER_OF_STEPS * (index + 1));

  constructor(public registrationService: RegistrationService,
              private alert: AlertService) {
    this.stepStates[1] = 'active';
  }

  ngOnInit() {
    this.user = this.registrationService.user;
    this.semester = this.registrationService.semester;
    this.institutes = this.registrationService.institutes;
    this.graduationsArray = this.registrationService.graduationAvailable;
  }

  startRegistration() {
    this.resetRegistration();
    this.stepStates[0] = 'active';
  }

  checkPartnerAndAdvanceStep(index) {
    if (!this.wasPartnerEntered()) {
      this.advanceOneStep(index);
    } else {
      // TODO implement PartnerCheck routine
      this.advanceOneStep(index);
    }
  }

  wasPartnerEntered() {
    return this.partner.lastName && this.partner.sNumber;
  }

  resetPartner() {
    this.partner.lastName = null;
    this.partner.sNumber = null;
    this.user.partner = null;
  }

  checkPartner() {
    if (this.checkingPartnerSub) {
      this.checkingPartnerSub.unsubscribe();
    }
    if (this.wasPartnerEntered()) {
      this.checkingPartner = true;
      this.checkingPartnerSub = this.registrationService.checkPartner(this.partner.lastName, this.partner.sNumber).subscribe(() => {
        this.checkingPartner = false;
      });
    } else {
      this.checkingPartner = false;
    }
  }

  isPartnerOk() {
    return !this.wasPartnerEntered()
      || this.registrationService.partnerStatus === ChosenPartner.registeredAndFree
      || this.registrationService.partnerStatus === ChosenPartner.notRegistered;
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
