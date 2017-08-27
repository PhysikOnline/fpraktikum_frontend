import { Component } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showView = false;

  constructor(private registrationService: RegistrationService, private alert: AlertService) {
    registrationService.init().subscribe(() => {
      this.alert.showSnack('SNACKBAR_GOT_DATA');
      this.showView = true;
    }, error => this.alert.showSnack('SNACKBAR_INITIAL_REQUEST_ERROR', 0));
  }
}
