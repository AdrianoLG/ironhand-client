import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable  } from 'rxjs';
import { Todos } from '../../models/todos';
import { Todo } from 'src/app/models/todo';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})

export class TodosService {

  response;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };

  constructor(
    private http: HttpClient,
    private globals: Globals
  ) { }

  getTodos(): Observable<Todos> {
    return this.http.get<Todos>(this.globals.url + '/todos', this.httpOptions);
  }

  getTodo(_id: string): Observable<Todo> {
    return this.http.get<Todo>(this.globals.url + '/todos/' + _id, this.httpOptions);
  }

  addTodo(todo: Todo): Observable<any> {
    return this.http.post<Todo>(this.globals.url + '/todos', todo, this.httpOptions);
  }

  completeTodo(_id) {
    const body = [
      {
        propName: 'completed',
        value: true
      }
    ];
    return this.http.patch<Todo>(this.globals.url + '/todos/' + _id, body, this.httpOptions);
  }
}
