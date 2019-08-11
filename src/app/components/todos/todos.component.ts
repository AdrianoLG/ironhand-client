import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TodosService } from '../../services/todos/todos.service';
import { Todo } from '../../models/todo';
import { Todos } from 'src/app/models/todos';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TodosComponent implements OnInit {

  count: number;
  todos: Todo[];

  constructor(
    private todosService: TodosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todosService.getTodos()
      .subscribe(todos => {
        this.todos = todos.todos;
        this.count = +todos.count;
      }, error => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      });
  }

  onSelection(e, v) {
    console.log('Selection list');

    for (const a of v) {
      this.completeTask(a.value._id);
      console.log(a.value);
      this.getTodos();
    }
  }

  completeTask(id) {
    this.todosService.completeTodo(id)
      .subscribe(message => {
        console.log(message);
      }, error => {
        console.log(error);
      });
  }

}
