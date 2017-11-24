import { NgModule } from '@angular/core';
import {
  MdButtonModule, MdCardModule, MdCheckboxModule, MdDialogModule, MdInputModule, MdListModule, MdProgressBarModule,
  MdRadioModule, MdSlideToggleModule
} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdCheckboxModule,
    MdCardModule,
    MdProgressBarModule,
    MdRadioModule,
    MdInputModule,
    MdSlideToggleModule,
    MdListModule,
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdCardModule,
    MdProgressBarModule,
    MdRadioModule,
    MdInputModule,
    MdSlideToggleModule,
    MdListModule,
    MdDialogModule,
  ]
})
export class MaterialModule {
}
