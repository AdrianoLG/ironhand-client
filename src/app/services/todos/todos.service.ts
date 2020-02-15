import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo';
import { Globals } from '../globals';

export interface TodosResponse {
  count: number;
  todos: Todo[];
}

@Injectable({
  providedIn: 'root'
})

export class TodosService {

  response;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    })
  };

  constructor(
    private http: HttpClient,
    private globals: Globals
  ) { }

  getTodos(): Observable<TodosResponse> {
    // Fix - localstorage is already set at this point but Bearer is null in the HTTP request
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<TodosResponse>(this.globals.url + '/todos', this.httpOptions);
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

  uncompleteTodo(_id) {
    const body = [
      {
        propName: 'completed',
        value: false
      }
    ];
    return this.http.patch<Todo>(this.globals.url + '/todos/' + _id, body, this.httpOptions);
  }

  deleteCompleted() {
    return this.http.delete(this.globals.url + '/todos', this.httpOptions);
  }

}
