import { Route } from '@angular/router';
import { RegistrationComponent } from './registration.component';
import { RegistrationFormPreflightComponent } from './registration-form-preflight/registration-form-preflight.component';
import { RegistrationInfoComponent } from './registration-info/registration-info.component';
import { RegistrationFormMainComponent } from './registration-form-main/registration-form-main.component';
import { RegistrationGuard } from './guards/registraton.guard';
import { RegistrationEndComponent } from './registration-end/registration-end.component';
import { RegistrantInfoComponent } from './registrant-info/registrant-info.component';
import { RegistrationWaitlistComponent } from './registration-waitlist/registration-waitlist.component';
import { InTimeGuard } from './guards/intime.guard';

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
        canActivate: [InTimeGuard],
      },
      {
        path: 'main',
        component: RegistrationFormMainComponent,
        canActivate: [InTimeGuard],
      },
      {
        path: 'end',
        component: RegistrationEndComponent,
        canActivate: [InTimeGuard],
      },
      {
        path: 'info-registrant',
        component: RegistrantInfoComponent,
      },
      {
        path: 'waitlist',
        component: RegistrationWaitlistComponent,
        canActivate: [InTimeGuard],
      },
    ],
  },
];
