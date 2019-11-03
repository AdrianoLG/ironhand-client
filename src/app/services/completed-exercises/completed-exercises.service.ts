import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompletedExercise } from '../../models/completed-exercise';
import { Globals } from '../globals';

export interface CompletedExercisesResponse {
  count: number;
  completedExercises: CompletedExercise[];
}

@Injectable({
  providedIn: 'root'
})
export class CompletedExercisesService {

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

  getCompletedExercises(): Observable<CompletedExercisesResponse> {
    return this.http.get<CompletedExercisesResponse>( this.globals.url + '/exercise/completed-exercises', this.httpOptions);
  }

  getCompletedExercise(_id: string): Observable<CompletedExercise> {
    return this.http.get<CompletedExercise>(this.globals.url + '/exercise/completed-exercises/' + _id, this.httpOptions);
  }

  addCompletedExercise(project: CompletedExercise): Observable<any> {
    return this.http.post<CompletedExercise>(this.globals.url + '/exercise/completed-exercises/', project, this.httpOptions);
  }

  updateCompletedExercise(_id: string, completedExercise: CompletedExercise) {
    const body = [
      {
        propName: 'exerciseId',
        value: completedExercise.exerciseId
      },
      {
        propName: 'date',
        value: completedExercise.date
      },
      {
        propName: 'repetitions',
        value: completedExercise.repetitions
      },
      {
        propName: 'time',
        value: completedExercise.time
      },
      {
        propName: 'minHeart',
        value: completedExercise.minHeart
      },
      {
        propName: 'maxHeart',
        value: completedExercise.maxHeart
      }
    ];
    return this.http.patch<CompletedExercise>(this.globals.url + '/exercise/completed-exercises/' + _id, body, this.httpOptions);
  }

  removeCompletedExercise(_id: string): any {
    return this.http.delete(this.globals.url + '/exercise/completed-exercises/' + _id, this.httpOptions);
  }
}
