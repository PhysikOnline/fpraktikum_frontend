import { Component } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { AlertService } from '../services/alert.service';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

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
    }, error => this.alert.showDialog(ErrorDialogComponent, {
      content: JSON.stringify(error),
      isBackend: true,
    }));
  }
}
