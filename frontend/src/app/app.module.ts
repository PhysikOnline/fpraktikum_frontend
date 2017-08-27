import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceModule } from '../services/service.module';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule, MdCardModule, MdCheckboxModule, MdInputModule, MdListModule, MdProgressBarModule,
  MdRadioModule, MdSlideToggleModule
} from '@angular/material';
import { TranslatePipe } from '../pipes/translate.pipe';
import { StepComponent } from './step/step.component';
import { FormsModule } from '@angular/forms';
import { InstituteFilterPipe } from '../pipes/institute-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    TranslatePipe,
    StepComponent,
    InstituteFilterPipe,
  ],
  imports: [
    BrowserModule,
    ServiceModule,
    BrowserAnimationsModule,
    FormsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdCardModule,
    MdProgressBarModule,
    MdRadioModule,
    MdInputModule,
    MdSlideToggleModule,
    MdListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
