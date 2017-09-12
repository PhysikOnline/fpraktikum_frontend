import { NgModule } from '@angular/core';
import { RegistrationService } from './registration.service';
import { TranslateService } from './translate.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from './alert.service';
import { MdSnackBarModule } from '@angular/material';
import { ApiService } from './api.service';
import { DateService } from './date.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    MdSnackBarModule
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
