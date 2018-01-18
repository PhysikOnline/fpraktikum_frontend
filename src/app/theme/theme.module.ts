import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepComponent } from './step/step.component';
import { TemplateErrorComponent } from './template-error/template-error.component';
import { FooterComponent } from './footer/footer.component';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import { RatingComponent } from './rating/rating.component';
import { NotIntimeComponent } from './not-intime/not-intime.component';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { StarRatingModule } from 'angular-star-rating';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, MaterialModule, PipesModule, StarRatingModule, FormsModule],
  declarations: [
    StepComponent,
    TemplateErrorComponent,
    FooterComponent,
    LanguageSwitcherComponent,
    RatingComponent,
    NotIntimeComponent,
  ],
  exports: [
    StepComponent,
    TemplateErrorComponent,
    FooterComponent,
    LanguageSwitcherComponent,
    RatingComponent,
    NotIntimeComponent,
  ],
})
export class ThemeModule {}
