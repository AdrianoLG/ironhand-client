import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TodosService } from '../../services/todos/todos.service';
import { Todo } from '../../models/todo';
import { MenuService } from 'src/app/services/menu/menu.service';

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
    private menuService: MenuService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.menuService.changeMenuItems([
      {
        name: 'Cerrar sesión',
        icon: 'logout'
      },
      {
        name: 'Borrar completadas',
        icon: 'delete_outline'
      },
      {
        name: 'Salir',
        icon: 'exit_to_app'
      }
    ]);
    this.getTodos();
    this.menuService.needRefresh.subscribe(refresh => {
      if (refresh) {
        this.todos = null;
        this.count = 0;
        this.getTodos();
      }
    });
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

  onSelection(v) {
    for (const a of v) {
      if (a.value.completed) {
        this.uncompleteTodo(a.value._id);
      } else {
        this.completeTodo(a.value._id);
      }
      this.getTodos();
    }
  }

  completeTodo(id) {
    this.todosService.completeTodo(id)
      .subscribe(message => {
        console.log(message);
      }, error => {
        console.log(error);
      });
  }

  uncompleteTodo(id) {
    this.todosService.uncompleteTodo(id)
      .subscribe(message => {
        console.log(message);
      }, error => {
        console.log(error);
      });
  }

}
