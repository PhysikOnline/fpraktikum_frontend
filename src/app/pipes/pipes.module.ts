import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from './translate.pipe';
import { InstituteFilterPipe } from './institute-filter.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [TranslatePipe, InstituteFilterPipe],
  exports: [TranslatePipe, InstituteFilterPipe],
})
export class PipesModule {}
