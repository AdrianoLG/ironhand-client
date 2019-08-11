import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoodMeals } from '../../models/food-meals';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(
    private http: HttpClient,
    private globals: Globals
  ) { }

  getFoodMeals(): Observable<FoodMeals> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };

    return this.http.get<FoodMeals>(this.globals.url + '/food/meals', httpOptions);
  }
}
