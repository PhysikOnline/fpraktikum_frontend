import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationCompleteComponent } from './registration-complete/registration-complete.component';
import { RegisteredInfoComponent } from './registered-info/registered-info.component';
import { UserInfoListComponent } from './user-info-list/user-info-list.component';
import { PartnerInfoComponent } from './partner-info/partner-info.component';
import { WaitlistInfoComponent } from './waitlist-info/waitlist-info.component';
import { RegistrationComponent } from './registration.component';
import { ThemeModule } from '../theme/theme.module';
import { DialogsModule } from '../dialogs/dialogs.module';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router/src/config';
import { RouterModule } from '@angular/router';
import { reducer, effects } from './store/index';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { routes } from './registration.routing';
import { RegistrationFormPreflightComponent } from './registration-form-preflight/registration-form-preflight.component';
import { RegistrationInfoComponent } from './registration-info/registration-info.component';
import { RegistrationFormMainComponent } from './registration-form-main/registration-form-main.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    DialogsModule,
    MaterialModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('registration', reducer),
    EffectsModule.forFeature(effects),
  ],
  declarations: [
    RegistrationCompleteComponent,
    RegisteredInfoComponent,
    UserInfoListComponent,
    PartnerInfoComponent,
    WaitlistInfoComponent,
    RegistrationComponent,
    RegistrationInfoComponent,
    RegistrationFormPreflightComponent,
    RegistrationFormMainComponent,
  ],
  exports: [RegistrationComponent],
})
export class RegistrationModule {}
