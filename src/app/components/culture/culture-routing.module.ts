import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CultureComponent } from './culture.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookUpdateComponent } from './book-update/book-update.component';

const routes: Routes = [
  { path: '', component: CultureComponent },
  { path: 'libro/crear', component: BookCreateComponent },
  { path: 'libro/:_id', component: BookDetailComponent },
  { path: 'libro/editar/:_id', component: BookUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CultureRoutingModule { }
