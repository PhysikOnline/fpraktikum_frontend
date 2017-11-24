import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatInputModule, MatListModule,
  MatMenuModule,
  MatProgressBarModule, MatProgressSpinnerModule,
  MatRadioModule, MatSlideToggleModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressBarModule,
    MatRadioModule,
    MatInputModule,
    MatSlideToggleModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatChipsModule,
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressBarModule,
    MatRadioModule,
    MatInputModule,
    MatSlideToggleModule,
    MatListModule,
    MatDialogModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatChipsModule,
  ]
})
export class MaterialModule {
}
