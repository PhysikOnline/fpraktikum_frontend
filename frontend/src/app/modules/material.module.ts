import { NgModule } from '@angular/core';
import {
  MdButtonModule, MdCardModule, MdCheckboxModule, MdDialogModule, MdInputModule, MdListModule, MdMenuModule,
  MdProgressBarModule, MdProgressSpinnerModule,
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
    MdProgressSpinnerModule,
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
    MdProgressSpinnerModule,
  ]
})
export class MaterialModule {
}
