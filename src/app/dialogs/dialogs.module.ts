import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionDialogComponent } from './question-dialog/question-dialog.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { InfoBoxComponent } from './info-box-dialog/info-box.component';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { ThemeModule } from '../theme/theme.module';
import { RegistrationCompleteComponent } from './registration-complete/registration-complete.component';
import { WaitlistDialogComponent } from './waitlist-dialog/waitlist-dialog.component';

@NgModule({
  imports: [CommonModule, MaterialModule, PipesModule, ThemeModule],
  declarations: [
    QuestionDialogComponent,
    ErrorDialogComponent,
    InfoBoxComponent,
    RegistrationCompleteComponent,
    WaitlistDialogComponent,
  ],
  entryComponents: [
    QuestionDialogComponent,
    ErrorDialogComponent,
    InfoBoxComponent,
    RegistrationCompleteComponent,
    WaitlistDialogComponent,
  ],
  exports: [
    QuestionDialogComponent,
    ErrorDialogComponent,
    InfoBoxComponent,
    RegistrationCompleteComponent,
    WaitlistDialogComponent,
  ],
})
export class DialogsModule {}
