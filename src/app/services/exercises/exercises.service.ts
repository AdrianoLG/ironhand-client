import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise } from '../../models/exercise';
import { Globals } from '../globals';

export interface ExercisesResponse {
  count: number;
  exercises: Exercise[];
}

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

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

  getExercises(): Observable<ExercisesResponse> {
    return this.http.get<ExercisesResponse>(this.globals.url + '/exercise/exercises/', this.httpOptions);
  }

  getExercise(_id: string): Observable<Exercise> {
    return this.http.get<Exercise>(this.globals.url + '/exercise/exercises/' + _id, this.httpOptions);
  }

  addExercise(exercise: Exercise): Observable<any> {
    return this.http.post<Exercise>(this.globals.url + '/exercise/exercises', exercise, this.httpOptions);
  }

  updateExercise(_id: string, exercise: Exercise) {
    const body = [
      {
        propName: 'name',
        value: exercise.name
      },
      {
        propName: 'category',
        value: exercise.category
      },
      {
        propName: 'bodyParts',
        value: exercise.bodyParts
      }
    ];
    return this.http.patch<Exercise>(this.globals.url + '/exercise/exercises/' + _id, body, this.httpOptions);
  }

  removeExercise(_id: string): any {
    return this.http.delete(this.globals.url + '/exercise/exercises/' + _id, this.httpOptions);
  }
}
