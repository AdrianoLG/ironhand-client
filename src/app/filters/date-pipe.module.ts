import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFilterPipe } from './date-filter.pipe';

@NgModule({
  declarations: [
    DateFilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DateFilterPipe
  ]
})
export class DatePipeModule { }
