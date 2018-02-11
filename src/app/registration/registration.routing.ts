import { Route } from '@angular/router';
import { RegistrationComponent } from './registration.component';
import { RegistrationFormPreflightComponent } from './registration-form-preflight/registration-form-preflight.component';
import { RegistrationInfoComponent } from './registration-info/registration-info.component';

export const routes: Route[] = [
  {
    path: '',
    component: RegistrationComponent,
    children: [
      { path: 'info', component: RegistrationInfoComponent },
      {
        path: 'preflight',
        component: RegistrationFormPreflightComponent,
      },
    ],
  },
];
