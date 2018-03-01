import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepComponent } from './step/step.component';
import { TemplateErrorComponent } from './template-error/template-error.component';
import { FooterComponent } from './footer/footer.component';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import { RatingComponent } from './rating/rating.component';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { StarRatingModule } from 'angular-star-rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChosenPartnerInfoComponent } from './chosen-partner-info/chosen-partner-info.component';
import { InfoListComponent } from './info-list/info-list.component';
import { InstituteFormComponent } from './institute-form/institute-form.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule,
    StarRatingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    StepComponent,
    TemplateErrorComponent,
    FooterComponent,
    LanguageSwitcherComponent,
    RatingComponent,
    ChosenPartnerInfoComponent,
    InfoListComponent,
    InstituteFormComponent,
  ],
  exports: [
    StepComponent,
    TemplateErrorComponent,
    FooterComponent,
    LanguageSwitcherComponent,
    RatingComponent,
    ChosenPartnerInfoComponent,
    InfoListComponent,
    InstituteFormComponent,
  ],
})
export class ThemeModule {}
