import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JGWatering } from 'src/app/models/jg-watering';
import { Globals } from '../globals';

export interface JGWateringsResponse {
  count: number;
  waterings: JGWatering[];
}

@Injectable({
  providedIn: 'root'
})
export class JgWateringsService {

  response;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };

  constructor(private http: HttpClient, private globals: Globals) {}

  getWaterings(): Observable<JGWateringsResponse> {
    return this.http.get<JGWateringsResponse>(this.globals.url + '/waterings', this.httpOptions);
  }

  getWatering(_id: string): Observable<JGWatering> {
    return this.http.get<JGWatering>(this.globals.url + '/waterings/' + _id, this.httpOptions);
  }

  addWatering(watering: JGWatering): Observable<any> {
    return this.http.post<JGWatering>(this.globals.url + '/waterings', watering, this.httpOptions);
  }

  updateWatering(_id: string, watering: JGWatering) {
    const body = [
      {
        propName: 'container',
        value: watering.container
      },
      {
        propName: 'date',
        value: watering.date
      },
      {
        propName: 'fertilizer',
        value: watering.fertilizer
      }
    ];
    return this.http.patch<JGWatering>(this.globals.url + '/waterings/' + _id, body, this.httpOptions);
  }

  removeWatering(_id: string): any {
    return this.http.delete(this.globals.url + '/waterings/' + _id, this.httpOptions);
  }
}
