import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../globals';
import { Rehearsal } from 'src/app/models/rehearsal';

export interface RehearsalsResponse {
  count: number;
  rehearsals: Rehearsal[];
}
@Injectable({
  providedIn: 'root'
})
export class RehearsalsService {
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

  getRehearsals(): Observable<RehearsalsResponse> {
    return this.http.get<RehearsalsResponse>(this.globals.url + '/rehearsals', this.httpOptions);
  }

  getRehearsal(_id: string): Observable<Rehearsal> {
    return this.http.get<Rehearsal>(this.globals.url + '/rehearsals/' + _id, this.httpOptions);
  }

  addRehearsal(rehearsal: Rehearsal): any {
    return this.http.post<any>(this.globals.url + '/rehearsals', rehearsal, this.httpOptions);
  }

  updateRehearsal(_id: string, rehearsal: Rehearsal): any {
    const body = [
      {
        propName: 'date',
        value: rehearsal.date
      },
      {
        propName: 'instrument',
        value: rehearsal.instrument
      },
      {
        propName: 'time',
        value: rehearsal.time
      },
      {
        propName: 'sheets',
        value: rehearsal.sheets
      }
    ];
    return this.http.patch<Rehearsal>(this.globals.url + '/rehearsals/' + _id, body, this.httpOptions);
  }

  removeRehearsals(_id: string): any {
    return this.http.delete(this.globals.url + '/rehearsals/' + _id, this.httpOptions);
  }
}
