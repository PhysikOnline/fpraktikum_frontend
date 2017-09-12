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
import { InfoBoxComponent } from './info-box/info-box.component';
import { NotIntimeComponent } from './not-intime/not-intime.component';

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
  ],
  entryComponents: [
    RegistrationCompleteComponent,
    ErrorDialogComponent,
    InfoBoxComponent,
  ],
  imports: [
    BrowserModule,
    ServiceModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    StarRatingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
