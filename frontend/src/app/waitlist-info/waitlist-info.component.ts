import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { User } from '../../models/user';
import { AlertService } from '../../services/alert.service';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-waitlist-info',
  templateUrl: './waitlistinfo.component.html',
  styleUrls: ['./waitlist-info.component.scss']
})
export class WaitlistInfoComponent implements OnInit {
  user: User;

  constructor(private registrationService: RegistrationService,
              private alert: AlertService,
              private tranlate: TranslateService) { }

  ngOnInit() {
    this.user = this.registrationService.user;
  }

  onDelete() {
    this.alert.showQuestionDialog('REMOVE_FROM_WAITLIST_ARE_YOU_SURE').then((res) => {
      if (res === true) {
        this.registrationService.removeFromWaitlist().subscribe();
      }
    });
  }
}
