import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Statistics } from 'src/app/models/statistics';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  response;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };

  constructor(private http: HttpClient, private globals: Globals) { }

  getStatistics(): Observable<Statistics> {
    return this.http.get<Statistics>(this.globals.url + '/statistics', this.httpOptions);
  }
}
