import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CultureComponent } from './culture.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookUpdateComponent } from './book-update/book-update.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieUpdateComponent } from './movie-update/movie-update.component';

const routes: Routes = [
  { path: '', component: CultureComponent },
  { path: 'libro/crear', component: BookCreateComponent },
  { path: 'libro/:_id', component: BookDetailComponent },
  { path: 'libro/editar/:_id', component: BookUpdateComponent },
  { path: 'pelicula/crear', component: MovieCreateComponent },
  { path: 'pelicula/:_id', component: MovieDetailComponent },
  { path: 'pelicula/editar/:_id', component: MovieUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CultureRoutingModule { }
