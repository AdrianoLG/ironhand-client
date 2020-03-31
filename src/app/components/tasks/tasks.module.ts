import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { MaterialModule } from '../../material/material.module';
import { TodoCreateComponent } from './todo-create/todo-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectUpdateComponent } from './project-update/project-update.component';
import { TodoUpdateComponent } from './todo-update/todo-update.component';

@NgModule({
  declarations: [
    TasksComponent,
    TodoCreateComponent,
    ProjectCreateComponent,
    ProjectUpdateComponent,
    TodoUpdateComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TasksModule { }
