import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { UserInterface } from '../interfaces/user.interface';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { InstituteInterface } from '../interfaces/institute.interface';

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
    ])
  ]
})
export class RegistrationFormComponent implements OnInit {

  user: UserInterface;
  institutes: InstituteInterface[];
  semester: string;
  graduationsArray: string[];
  partner: {
    lastName: string,
    sNumber: string,
  } = {lastName: null, sNumber: null};
  onlyOneInstitute = false;

  stepStates = Array.from(Array(TOTAL_NUMBER_OF_STEPS)).map(e => 'inactive');
  progress = Array.from(Array(TOTAL_NUMBER_OF_STEPS)).map((e, index) => 100 / TOTAL_NUMBER_OF_STEPS * (index + 1));

  constructor(private registrationService: RegistrationService) {
  }

  ngOnInit() {
    this.user = this.registrationService.user;
    this.semester = this.registrationService.semester;
    this.institutes = this.registrationService.institutes;
    this.graduationsArray = this.registrationService.graduationAvailable;
  }

  startRegistration() {
    this.stepStates[0] = 'active';
  }

  checkPartnerAndAdvanceStep(index) {
    if(!(this.partner.lastName && this.partner.sNumber)) {
      this.advanceOneStep(index);
    } else {
      // TODO implement PartnerCheck routine
      this.user.partner = {
        firstName: 'Test',
        lastName: this.partner.lastName,
        sNumber: this.partner.sNumber,
        email: '',
        institutes: []
      }
      this.advanceOneStep(index);
    }
  }

  advanceOneStep(index) {
    if (index === this.stepStates.length) {
      this.registrationEnd();
    } else {
      this.toggleStep(index);
    }
  }

  registrationEnd() {

  }

  toggleStep(index) {
    this.stepStates[index] = this.stepStates[index] === 'active' ? 'inactive' : 'active';
  }

  instituteChange(instituteEvent) {
    const institute: InstituteInterface = instituteEvent.value;
    const instituteOfSameHalf = this.user.institutes.find(i => i.semesterHalf === institute.semesterHalf);
    if (instituteOfSameHalf) {
      this.user.institutes[this.user.institutes.indexOf(instituteOfSameHalf)] = institute;
    } else {
      this.user.institutes.push(institute);
    }
    console.log(this.user.institutes)
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
    return this.user.graduation === 'LA';
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
