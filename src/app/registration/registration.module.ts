import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationCompleteComponent } from './registration-complete/registration-complete.component';
import { RegistrationComponent } from './registration.component';
import { ThemeModule } from '../theme/theme.module';
import { ServiceModule } from '../services/service.module';
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
import { guards } from './guards/index';
import { RegistrationEndComponent } from './registration-end/registration-end.component';
import { RegistrantInfoComponent } from './registrant-info/registrant-info.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    DialogsModule,
    MaterialModule,
    PipesModule,
    FormsModule,
    ServiceModule,
    ReactiveFormsModule,
    StoreModule.forFeature('registration', reducer),
    EffectsModule.forFeature(effects),
  ],
  declarations: [
    RegistrationCompleteComponent,
    RegistrationComponent,
    RegistrationInfoComponent,
    RegistrationFormPreflightComponent,
    RegistrationFormMainComponent,
    RegistrationEndComponent,
    RegistrantInfoComponent,
  ],
  providers: [...guards],
  exports: [RegistrationComponent],
})
export class RegistrationModule {}
