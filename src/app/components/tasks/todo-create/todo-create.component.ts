import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Todo } from '../../../models/todo';
import { TodosService } from 'src/app/services/todos/todos.service';
import { MatSliderChange } from '@angular/material';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss']
})
export class TodoCreateComponent implements OnInit {

  addTaskForm: FormGroup;
  todo: Todo;

  constructor(
    private todosService: TodosService,
    private location: Location,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.addTaskForm = this.formBuilder.group({
      todoName: ['', [
        Validators.required
      ]],
      category: ['', [
        Validators.required
      ]],
      priority: [, [
        Validators.required
      ]]
    });
  }

  changePriority(e: MatSliderChange) {
    this.addTaskForm.patchValue({
      priority: e.value
    });
    console.log(this.addTaskForm.value);
  }

  goBack(): void {
    this.location.back();
  }

  addTask(): void {
    if (this.addTaskForm.invalid) {
      return;
    }
    this.todo = {
      _id: null,
      name: this.addTaskForm.value.todoName,
      category: this.addTaskForm.value.category,
      priority: this.addTaskForm.value.priority,
      completed: false
    };
    this.todosService.addTodo(this.todo).subscribe(() => {
      this.goBack();
    }, error => {
      console.log(error);
    });
  }

}
