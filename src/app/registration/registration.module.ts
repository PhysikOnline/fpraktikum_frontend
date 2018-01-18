import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { RegistrationCompleteComponent } from './registration-complete/registration-complete.component';
import { RegisteredInfoComponent } from './registered-info/registered-info.component';
import { UserInfoListComponent } from './user-info-list/user-info-list.component';
import { PartnerInfoComponent } from './partner-info/partner-info.component';
import { ChosenPartnerInfoComponent } from './chosen-partner-info/chosen-partner-info.component';
import { WaitlistInfoComponent } from './waitlist-info/waitlist-info.component';
import { StoreModule } from '@ngrx/store/src/store_module';
import { reducer } from '../store/reducers/index';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('registration', reducer)],
  declarations: [
    RegistrationFormComponent,
    RegistrationCompleteComponent,
    RegisteredInfoComponent,
    UserInfoListComponent,
    PartnerInfoComponent,
    ChosenPartnerInfoComponent,
    WaitlistInfoComponent,
  ],
})
export class RegistrationModule {}
