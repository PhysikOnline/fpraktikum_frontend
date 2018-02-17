import { Route } from '@angular/router';
import { RegistrationComponent } from './registration.component';
import { RegistrationFormPreflightComponent } from './registration-form-preflight/registration-form-preflight.component';
import { RegistrationInfoComponent } from './registration-info/registration-info.component';
import { RegistrationFormMainComponent } from './registration-form-main/registration-form-main.component';
import { RegistrationGuard } from './guards/registraton.guard';

export const routes: Route[] = [
  {
    path: '',
    canActivate: [RegistrationGuard],
    component: RegistrationComponent,
    children: [
      { path: 'info', component: RegistrationInfoComponent },
      {
        path: 'preflight',
        component: RegistrationFormPreflightComponent,
      },
      {
        path: 'main',
        component: RegistrationFormMainComponent,
      },
    ],
  },
];
