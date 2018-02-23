import { NgModule } from '@angular/core';
import { TranslateService } from './translate.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from './alert.service';
import { MatSnackBarModule } from '@angular/material';
import { ApiService } from './api.service';
import { DateService } from './date.service';
import { HttpModule } from '@angular/http';
import { LoadingService } from './loading.service';
import { UserService } from './user.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [HttpClientModule, MatSnackBarModule, HttpModule],
  providers: [
    TranslateService,
    AlertService,
    ApiService,
    DateService,
    LoadingService,
    UserService,
  ],
})
export class ServiceModule {}
