import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { User } from '../../models/user';
import { AlertService } from '../../services/alert.service';
import { TranslateService } from '../../services/translate.service';
import { InfoBoxComponent } from '../../dialogs/info-box-dialog/info-box.component';

@Component({
  selector: 'app-waitlist-info',
  templateUrl: './waitlistinfo.component.html',
  styleUrls: ['./waitlist-info.component.scss'],
})
export class WaitlistInfoComponent implements OnInit {
  user: User;
  submitting = false;

  constructor(
    private registrationService: RegistrationService,
    private alert: AlertService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.user = this.registrationService.user;
  }

  onDelete() {
    this.alert
      .showQuestionDialog(this.translate.translate('REMOVE_FROM_WAITLIST_ARE_YOU_SURE'))
      .then(res => {
        if (res === true) {
          this.submitting = true;
          this.registrationService.removeFromWaitlist().subscribe(() => {
            this.onSignOutSuccess();
          }, () => (this.submitting = false));
        }
      });
  }

  private onSignOutSuccess() {
    this.alert.showDialog(InfoBoxComponent, {
      title: 'SIGN_OUT_BOX_TITLE',
    });
    this.submitting = false;
  }
}
