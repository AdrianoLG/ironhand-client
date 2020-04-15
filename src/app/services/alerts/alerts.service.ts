import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alert } from 'src/app/models/alert';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  response;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };

  constructor(private http: HttpClient, private globals: Globals) { }

  getAlerts(): Observable<Alert> {
    return this.http.get<Alert>(this.globals.url + '/alerts', this.httpOptions);
  }
}
