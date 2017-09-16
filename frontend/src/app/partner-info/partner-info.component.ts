import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { User } from '../../models/user';
import { AlertService } from '../../services/alert.service';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-partner-info',
  templateUrl: './partner-info.component.html',
  styleUrls: ['./partner-info.component.scss']
})
export class PartnerInfoComponent implements OnInit {
  user: User;

  constructor(private registrationService: RegistrationService,
              private alert: AlertService,
              private tranlate: TranslateService) { }

  ngOnInit() {
    this.user = this.registrationService.user;
  }

  accept() {
    this.registrationService.acceptDecline(true).subscribe();
  }

  decline() {
    this.alert.showQuestionDialog(this.tranlate.translate('SIGN_OUT_ARE_YOU_SURE')).then((res) => {
      if (res === true) {
        this.registrationService.acceptDecline(false).subscribe();
      }
    })
  }
}
