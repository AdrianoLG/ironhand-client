import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../globals';
import { Cocktail } from 'src/app/models/cocktail';

export interface CocktailsResponse {
  count: number;
  cocktails: Cocktail[]
}
@Injectable({
  providedIn: 'root'
})
export class CocktailsService {
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

  getCocktails(): Observable<CocktailsResponse> {
    return this.http.get<CocktailsResponse>(this.globals.url + '/cocktails', this.httpOptions);
  }

  getCocktail(_id: string): Observable<Cocktail> {
    return this.http.get<Cocktail>(this.globals.url + '/cocktails/' + _id, this.httpOptions);
  }

  addCocktail(cocktail: Cocktail): any {
    return this.http.post<any>(this.globals.url + '/cocktails', cocktail, this.httpOptions);
  }
  updateCocktail(_id: string, cocktail: Cocktail): any {
    const body = [
      {
        propName: 'name',
        value: cocktail.name
      },
      {
        propName: 'img',
        value: cocktail.img
      },
      {
        propName: 'ingredients',
        value: cocktail.ingredients
      },
      {
        propName: 'mixture',
        value: cocktail.mixture
      }
    ];
    return this.http.patch<Cocktail>(this.globals.url + '/cocktails/' + _id, body, this.httpOptions);
  }

  removeCocktail(_id: string): any {
    return this.http.delete(this.globals.url + '/cocktails/' + _id, this.httpOptions);
  }
}
