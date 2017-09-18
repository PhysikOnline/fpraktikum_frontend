import { NgModule } from '@angular/core';
import {
  MdButtonModule, MdCardModule, MdCheckboxModule, MdChipsModule, MdDialogModule, MdInputModule, MdListModule,
  MdMenuModule,
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
    MdChipsModule,
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
    MdChipsModule,
  ]
})
export class MaterialModule {
}
