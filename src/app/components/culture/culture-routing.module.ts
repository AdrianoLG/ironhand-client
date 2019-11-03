import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CultureComponent } from './culture.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookUpdateComponent } from './book-update/book-update.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieUpdateComponent } from './movie-update/movie-update.component';
import { TvSerieCreateComponent } from './tv-serie-create/tv-serie-create.component';
import { TvSerieDetailComponent } from './tv-serie-detail/tv-serie-detail.component';
import { TvSerieUpdateComponent } from './tv-serie-update/tv-serie-update.component';

const routes: Routes = [
  { path: '', component: CultureComponent },
  { path: 'libros/crear', component: BookCreateComponent },
  { path: 'libros/:_id', component: BookDetailComponent },
  { path: 'libros/editar/:_id', component: BookUpdateComponent },
  { path: 'peliculas/crear', component: MovieCreateComponent },
  { path: 'peliculas/:_id', component: MovieDetailComponent },
  { path: 'peliculas/editar/:_id', component: MovieUpdateComponent },
  { path: 'series/crear', component: TvSerieCreateComponent },
  { path: 'series/:_id', component: TvSerieDetailComponent },
  { path: 'series/editar/:_id', component: TvSerieUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CultureRoutingModule { }
