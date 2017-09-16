import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { User } from '../../models/user';
import { AlertService } from '../../services/alert.service';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-registered-info',
  templateUrl: './registered-info.component.html',
  styleUrls: ['./registered-info.component.scss']
})
export class RegisteredInfoComponent implements OnInit {
  user: User;

  constructor(private registrationService: RegistrationService,
              private alert: AlertService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.user = this.registrationService.user;
  }

  signOut() {
    this.alert.showQuestionDialog(this.translate.translate('SIGN_OUT_ARE_YOU_SURE')).then((res) => {
      if (res === true) {
        this.registrationService.signOutUser().subscribe(() => {
        });
      }
    });
  }
}
