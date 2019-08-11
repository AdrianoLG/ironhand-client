import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompletedExercise } from '../../models/completed-exercise';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(
    private http: HttpClient,
    private globals: Globals
  ) { }

  getCompletedExercises(): Observable<CompletedExercise> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };

    return this.http.get<CompletedExercise>( this.globals.url + '/exercise/completed-exercises', httpOptions);
  }
}
