import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { CultureComponent } from './culture.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CultureRoutingModule } from './culture-routing.module';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookUpdateComponent } from './book-update/book-update.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieUpdateComponent } from './movie-update/movie-update.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { TvSerieDetailComponent } from './tv-serie-detail/tv-serie-detail.component';
import { TvSerieUpdateComponent } from './tv-serie-update/tv-serie-update.component';
import { TvSerieCreateComponent } from './tv-serie-create/tv-serie-create.component';
import { CollectionPipeModule } from 'src/app/filters/collection-pipe.module';

@NgModule({
  declarations: [
    CultureComponent,
    BookCreateComponent,
    BookDetailComponent,
    BookUpdateComponent,
    MovieCreateComponent,
    MovieDetailComponent,
    MovieUpdateComponent,
    TvSerieDetailComponent,
    TvSerieUpdateComponent,
    TvSerieCreateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CultureRoutingModule,
    CollectionPipeModule
  ]
})
export class CultureModule { }
