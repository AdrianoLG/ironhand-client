import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosComponent } from './todos.component';
import { TodoCreateComponent } from './todo-create/todo-create.component';

const routes: Routes = [
  { path: '', component: TodosComponent },
  { path: 'crear', component: TodoCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
