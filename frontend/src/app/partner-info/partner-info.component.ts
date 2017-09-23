import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { User } from '../../models/user';
import { AlertService } from '../../services/alert.service';
import { TranslateService } from '../../services/translate.service';
import { Partner } from '../../models/partner';

@Component({
  selector: 'app-partner-info',
  templateUrl: './partner-info.component.html',
  styleUrls: ['./partner-info.component.scss']
})
export class PartnerInfoComponent implements OnInit {
  submitting = false;

  constructor(public registrationService: RegistrationService,
              private alert: AlertService,
              private translate: TranslateService) { }

  ngOnInit() {
  }

  accept() {
    this.submitting = true;
    this.registrationService.acceptDecline(true).subscribe(() => this.submitting = false, () => this.submitting = false);
  }

  decline() {
    this.alert.showQuestionDialog(this.translate.translate('SIGN_OUT_ARE_YOU_SURE')).then((res) => {
      if (res === true) {
        this.submitting = true;
        this.registrationService.acceptDecline(false).subscribe(() => this.submitting = false, () => this.submitting = false);
      }
    })
  }

  signOut() {
    this.alert.showQuestionDialog(this.translate.translate('SIGN_OUT_ARE_YOU_SURE')).then((res) => {
      if (res === true) {
        this.submitting = true;
        this.registrationService.signOutUser().subscribe(() => {
          this.submitting = false;
        }, () => this.submitting = false);
      }
    });
  }
}
