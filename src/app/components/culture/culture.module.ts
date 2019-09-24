import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { CultureComponent } from './culture.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CultureRoutingModule } from './culture-routing.module';
import { BookCreateComponent } from './book-create/book-create.component';
import { CollectionFilterPipe } from '../../filters/collection-filter.pipe';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookUpdateComponent } from './book-update/book-update.component';

@NgModule({
  declarations: [
    CultureComponent,
    BookCreateComponent,
    CollectionFilterPipe,
    BookDetailComponent,
    BookUpdateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CultureRoutingModule,
  ],
  exports: [ CollectionFilterPipe ]
})
export class CultureModule {}
