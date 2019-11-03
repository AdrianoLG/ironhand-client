import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BodyComponent } from './body.component';
import { MealsCreateComponent } from './meals/meals-create/meals-create.component';
import { MealsUpdateComponent } from './meals/meals-update/meals-update.component';
import { SuggestionCreateComponent } from './meals/suggestion-create/suggestion-create.component';
import { SuggestionUpdateComponent } from './meals/suggestion-update/suggestion-update.component';
import { CompletedCreateComponent } from './exercise/completed-create/completed-create.component';
import { CompletedUpdateComponent } from './exercise/completed-update/completed-update.component';
import { ListCreateComponent } from './exercise/list-create/list-create.component';
import { ListUpdateComponent } from './exercise/list-update/list-update.component';

const routes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'comida/comidas/crear', component: MealsCreateComponent },
  { path: 'comida/comidas/editar/:_id', component: MealsUpdateComponent },
  { path: 'comida/sugerencias/crear', component: SuggestionCreateComponent },
  { path: 'comida/sugerencias/editar/:_id', component: SuggestionUpdateComponent },
  { path: 'ejercicio/completados/crear', component: CompletedCreateComponent },
  { path: 'ejercicio/completados/editar/:_id', component: CompletedUpdateComponent },
  { path: 'ejercicio/listado/crear', component: ListCreateComponent },
  { path: 'ejercicio/listado/editar/:_id', component: ListUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BodyRoutingModule { }
