import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../globals';
import { Suggestion } from 'src/app/models/suggestion';

export interface SuggestionsResponse {
  count: number;
  suggestions: Suggestion[];
}

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {
  response;

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

  getSuggestions(): Observable<SuggestionsResponse> {
    return this.http.get<SuggestionsResponse>(this.globals.url + '/food/suggestions/', this.httpOptions);
  }

  getSuggestion(_id: string): Observable<Suggestion> {
    return this.http.get<Suggestion>(this.globals.url + '/food/suggestions/' + _id, this.httpOptions);
  }

  addSuggestion(project: Suggestion): Observable<any> {
    return this.http.post<Suggestion>(this.globals.url + '/food/suggestions/', project, this.httpOptions);
  }

  updateSuggestion(_id: string, suggestion: Suggestion) {
    const body = [
      {
        propName: 'name',
        value: suggestion.name
      },
      {
        propName: 'season',
        value: suggestion.season
      },
      {
        propName: 'ingredients',
        value: suggestion.ingredients
      }
    ];
    return this.http.patch<Suggestion>(this.globals.url + '/food/suggestions/' + _id, body, this.httpOptions);
  }

  removeSuggestion(_id: string): any {
    return this.http.delete(this.globals.url + '/food/suggestions/' + _id, this.httpOptions);
  }
}
