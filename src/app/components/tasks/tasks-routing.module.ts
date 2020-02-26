import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { TodoCreateComponent } from './todo-create/todo-create.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectUpdateComponent } from './project-update/project-update.component';

const routes: Routes = [
  { path: '', component: TasksComponent },
  { path: 'todo/crear', component: TodoCreateComponent },
  { path: 'proyecto/crear', component: ProjectCreateComponent },
  { path: 'proyecto/actualizar/:_id', component: ProjectUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
