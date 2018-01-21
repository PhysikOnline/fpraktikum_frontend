import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionDialogComponent } from './question-dialog/question-dialog.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { InfoBoxComponent } from './info-box-dialog/info-box.component';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [CommonModule, MaterialModule, PipesModule],
  declarations: [QuestionDialogComponent, ErrorDialogComponent, InfoBoxComponent],
  entryComponents: [QuestionDialogComponent, ErrorDialogComponent, InfoBoxComponent],
  exports: [QuestionDialogComponent, ErrorDialogComponent, InfoBoxComponent],
})
export class DialogsModule {}