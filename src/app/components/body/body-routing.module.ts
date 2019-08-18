import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BodyComponent } from './body.component';
import { MealsCreateComponent } from './meals/meals-create/meals-create.component';
import { MealsUpdateComponent } from './meals/meals-update/meals-update.component';

const routes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'comidas/crear', component: MealsCreateComponent },
  { path: 'comidas/editar/:_id', component: MealsUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BodyRoutingModule { }
