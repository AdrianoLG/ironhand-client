import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../globals';
import { Recipee } from 'src/app/models/recipee';

export interface RecipeesResponse {
  count: number;
  recipees: Recipee[]
}
@Injectable({
  providedIn: 'root'
})
export class RecipeesService {
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

  getRecipees(): Observable<RecipeesResponse> {
    return this.http.get<RecipeesResponse>(this.globals.url + '/recipees', this.httpOptions);
  }

  getRecipee(_id: string): Observable<Recipee> {
    return this.http.get<Recipee>(this.globals.url + '/recipees/' + _id, this.httpOptions);
  }

  addRecipee(recipee: Recipee): any {
    return this.http.post<any>(this.globals.url + '/recipees', recipee, this.httpOptions);
  }

  updateRecipee(_id: string, recipee: Recipee): any {
    const body = [
      {
        propName: 'name',
        value: recipee.name
      },
      {
        propName: 'img',
        value: recipee.img
      },
      {
        propName: 'ingredients',
        value: recipee.ingredients
      },
      {
        propName: 'instructions',
        value: recipee.instructions
      }
    ];
    return this.http.patch<Recipee>(this.globals.url + '/recipees/' + _id, body, this.httpOptions);
  }

  removeRecipees(_id: string): any {
    return this.http.delete(this.globals.url + '/recipees/' + _id, this.httpOptions);
  }
}
