import { NgModule } from '@angular/core';
import { RegistrationService } from './registration.service';
import { TranslateService } from './translate.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from './alert.service';
import { MatSnackBarModule } from '@angular/material';
import { ApiService } from './api.service';
import { DateService } from './date.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    MatSnackBarModule,
    HttpModule,
  ],
  providers: [
    RegistrationService,
    TranslateService,
    AlertService,
    ApiService,
    DateService,
  ],
})
export class ServiceModule {
}
