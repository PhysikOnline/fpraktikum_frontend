import { Route } from '@angular/router';
import { RegistrationComponent } from './registration.component';
import { RegistrationInfoComponent } from './registration-info/registration-info.component';

export const routes: Route[] = [
  {
    path: '',
    component: RegistrationComponent,
    children: [{ path: 'info', component: RegistrationInfoComponent }],
  },
];
