import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceModule } from '../services/service.module';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslatePipe } from '../pipes/translate.pipe';
import { StepComponent } from './step/step.component';
import { FormsModule } from '@angular/forms';
import { InstituteFilterPipe } from '../pipes/institute-filter.pipe';
import { MaterialModule } from './modules/material.module';
import { RegistrationCompleteComponent } from './registration-complete/registration-complete.component';
import { StarRatingModule } from 'angular-star-rating';
import { RatingComponent } from './rating/rating.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { RegisteredInfoComponent } from './registered-info/registered-info.component';
import { UserInfoListComponent } from './user-info-list/user-info-list.component';
import { InfoBoxComponent } from './info-box-dialog/info-box.component';
import { NotIntimeComponent } from './not-intime/not-intime.component';
import { PartnerInfoComponent } from './partner-info/partner-info.component';
import { TemplateErrorComponent } from './template-error/template-error.component';
import { QuestionDialogComponent } from './question-dialog/question-dialog.component';
import { FooterComponent } from './footer/footer.component';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import { ChosenPartnerInfoComponent } from './chosen-partner-info/chosen-partner-info.component';
import { WaitlistInfoComponent } from './waitlist-info/waitlist-info.component';
import * as Raven from 'raven-js';
import { ErrorHandler } from '@angular/core';
import {environment} from '../environments/environment';

if (environment.production) {
  Raven
    .config('https://4f7ddb18431c44bd9398744306a42fd0@po-sentry.physikelearning.de/8')
    .install();
}

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    TranslatePipe,
    StepComponent,
    InstituteFilterPipe,
    RegistrationCompleteComponent,
    RatingComponent,
    ErrorDialogComponent,
    RegisteredInfoComponent,
    UserInfoListComponent,
    InfoBoxComponent,
    NotIntimeComponent,
    PartnerInfoComponent,
    TemplateErrorComponent,
    QuestionDialogComponent,
    FooterComponent,
    LanguageSwitcherComponent,
    ChosenPartnerInfoComponent,
    WaitlistInfoComponent,
  ],
  entryComponents: [
    RegistrationCompleteComponent,
    ErrorDialogComponent,
    InfoBoxComponent,
    QuestionDialogComponent
  ],
  imports: [
    BrowserModule,
    ServiceModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    StarRatingModule.forRoot()
  ],
  providers: [{ provide: ErrorHandler, useClass: RavenErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
