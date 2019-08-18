import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../globals';
import { Meals } from 'src/app/models/meals';

export interface MealsResponse {
  count: number;
  meals: Meals[];
}
@Injectable({
  providedIn: 'root'
})
export class MealsService {

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

  getMeals(): Observable<MealsResponse> {
    return this.http.get<MealsResponse>(this.globals.url + '/food/meals', this.httpOptions);
  }

  getMeal(_id: string): Observable<Meals> {
    return this.http.get<Meals>(this.globals.url + '/food/meals/' + _id, this.httpOptions);
  }

  addMeals(meals: Meals): any {
    return this.http.post<any>(this.globals.url + '/food/meals', meals, this.httpOptions);
  }

  updateMeals(_id: string, meals: Meals): any {
    const body = [
      {
        propName: 'breakfast',
        value: meals.breakfast
      },
      {
        propName: 'lunch',
        value: meals.lunch
      },
      {
        propName: 'dinner',
        value: meals.dinner
      },
      {
        propName: 'date',
        value: meals.date
      }
    ];
    return this.http.patch<Meals>(this.globals.url + '/food/meals/' + _id, body, this.httpOptions);
  }

  removeMeals(_id: string): any {
    return this.http.delete(this.globals.url + '/food/meals/' + _id, this.httpOptions);
  }
}
