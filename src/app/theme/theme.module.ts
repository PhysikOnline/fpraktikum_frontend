import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepComponent } from './step/step.component';
import { TemplateErrorComponent } from './template-error/template-error.component';
import { FooterComponent } from './footer/footer.component';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import { RatingComponent } from './rating/rating.component';
import { NotIntimeComponent } from './not-intime/not-intime.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    StepComponent,
    TemplateErrorComponent,
    FooterComponent,
    LanguageSwitcherComponent,
    RatingComponent,
    NotIntimeComponent,
  ],
})
export class ThemeModule {}
