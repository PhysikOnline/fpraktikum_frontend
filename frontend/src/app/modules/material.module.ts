import { NgModule } from '@angular/core';
import {
  MdButtonModule, MdCardModule, MdCheckboxModule, MdDialogModule, MdInputModule, MdListModule, MdMenuModule,
  MdProgressBarModule,
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
    MdMenuModule,
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
    MdMenuModule,
  ]
})
export class MaterialModule {
}
