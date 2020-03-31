import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Todo } from '../../../models/todo';
import { TodosService } from 'src/app/services/todos/todos.service';
import { MatSliderChange } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-update',
  templateUrl: './todo-update.component.html',
  styleUrls: ['./todo-update.component.scss']
})
export class TodoUpdateComponent implements OnInit {
  updateTaskForm: FormGroup;
  todo: Todo;
  _id: string;

  constructor(
    private _todosService: TodosService,
    private _location: Location,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.updateTaskForm = this._formBuilder.group({
      todoName: ['', [
        Validators.required
      ]],
      category: ['', [
        Validators.required
      ]],
      priority: [, [
        Validators.required
      ]],
      completed: [, []]
    });
    this._id = this._route.snapshot.paramMap.get('_id');
    this._todosService.getTodo(this._id).subscribe((todo) => {
      this.updateTaskForm.patchValue({
        todoName: todo.name,
        category: todo.category,
        priority: todo.priority,
        completed: todo.completed
      });
    });
  }

  changePriority(e: MatSliderChange) {
    this.updateTaskForm.patchValue({
      priority: e.value
    });
  }

  goBack(): void {
    this._location.back();
  }

  updateTask(): void {
    if (this.updateTaskForm.invalid) {
      return;
    }
    this.todo = {
      _id: null,
      name: this.updateTaskForm.value.todoName,
      category: this.updateTaskForm.value.category,
      priority: this.updateTaskForm.value.priority,
      completed: this.updateTaskForm.value.completed
    };
    this._todosService.updateTodo(this._id, this.todo).subscribe(() => {
      this.goBack();
    }, error => {
      console.log(error);
    });
  }
  
}