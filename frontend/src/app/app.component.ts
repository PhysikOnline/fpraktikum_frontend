import { Component } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { AlertService } from '../services/alert.service';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { User } from '../models/user';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MdDialog } from '@angular/material';
import { InfoBoxComponent } from './info-box/info-box.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: 0}),
        animate('300ms', style({transform: 'translateY(0)', opacity: 1}))
      ]),
    ])
  ]
})
export class AppComponent {
  showView = false;
  user: User;

  constructor(private registrationService: RegistrationService,
              private alert: AlertService,
              private dialog: MdDialog) {
    this.initRegistrationService();
  }

  private initRegistrationService() {
    this.registrationService.init().subscribe(([registration, user]) => {
      // this.alert.showSnack('SNACKBAR_GOT_DATA');
      this.showView = true;
      this.user = this.registrationService.user;
    }, error => this.alert.showDialog(ErrorDialogComponent, {
      content: JSON.stringify(error),
      isBackend: true,
    }));
  }

  onInfoBoxClick() {
    this.dialog.open(InfoBoxComponent);
  }
}
