import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionFilterPipe } from './collection-filter.pipe';

@NgModule({
  declarations: [
    CollectionFilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CollectionFilterPipe
  ]
})
export class PipeModule { }
