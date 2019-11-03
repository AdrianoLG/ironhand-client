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
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieUpdateComponent } from './movie-update/movie-update.component';
import { TvShowCreateComponent } from './tv-show-create/tv-show-create.component';
import { TvShowUpdateComponent } from './tv-show-update/tv-show-update.component';
import { TvShowDetailComponent } from './tv-show-detail/tv-show-detail.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';

@NgModule({
	declarations: [
		CultureComponent,
		BookCreateComponent,
		CollectionFilterPipe,
		BookDetailComponent,
		BookUpdateComponent,
		MovieCreateComponent,
		MovieDetailComponent,
		MovieUpdateComponent,
		TvShowCreateComponent,
		TvShowUpdateComponent,
		TvShowDetailComponent
	],
	imports: [ CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, CultureRoutingModule ]
})
export class CultureModule {}
