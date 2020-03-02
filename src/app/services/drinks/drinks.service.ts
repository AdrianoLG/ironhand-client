import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../globals';
import { Drink } from 'src/app/models/drink';

export interface DrinksResponse {
  count: number;
  drinks: Drink[];
}
@Injectable({
  providedIn: 'root'
})
export class DrinksService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };

  constructor(
    private http: HttpClient,
    private globals: Globals
  ) { }

  getDrinks(): Observable<DrinksResponse> {
    return this.http.get<DrinksResponse>(this.globals.url + '/drinks', this.httpOptions);
  }

  getDrink(_id: string): Observable<Drink> {
    return this.http.get<Drink>(this.globals.url + '/drinks/' + _id, this.httpOptions);
  }

  addDrink(plant: Drink): any {
    return this.http.post<any>(this.globals.url + '/drinks', plant, this.httpOptions);
  }

  updateDrink(_id: string, plant: Drink): any {
    const body = [
      {
        propName: 'name',
        value: plant.name
      },
      {
        propName: 'brand',
        value: plant.brand
      },
      {
        propName: 'category',
        value: plant.category
      },
      {
        propName: 'alcohol',
        value: plant.alcohol
      },
      {
        propName: 'graduation',
        value: plant.graduation
      },
      {
        propName: 'img',
        value: plant.img
      },
      {
        propName: 'qty',
        value: plant.qty
      },
      {
        propName: 'unit',
        value: plant.unit
      },
      {
        propName: 'productQty',
        value: plant.productQty
      }
    ];
    return this.http.patch<Drink>(this.globals.url + '/drinks/' + _id, body, this.httpOptions);
  }

  removeDrink(_id: string): any {
    return this.http.delete(this.globals.url + '/drinks/' + _id, this.httpOptions);
  }
}
