import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../globals';
import { Cleanup } from 'src/app/models/cleanup';

export interface CleanupsResponse {
  count: number;
  cleanups: Cleanup[]
}
@Injectable({
  providedIn: 'root'
})
export class CleanupsService {
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

  getCleanups(): Observable<CleanupsResponse> {
    return this.http.get<CleanupsResponse>(this.globals.url + '/cleanup', this.httpOptions);
  }

  getCleanup(_id: string): Observable<Cleanup> {
    return this.http.get<Cleanup>(this.globals.url + '/cleanup/' + _id, this.httpOptions);
  }

  addCleanup(cleanup: Cleanup): any {
    return this.http.post<any>(this.globals.url + '/cleanup', cleanup, this.httpOptions);
  }

  updateCleanup(_id: string, cleanup: Cleanup): any {
    const body = [
      {
        propName: 'place',
        value: cleanup.place
      },
      {
        propName: 'date',
        value: cleanup.date
      },
      {
        propName: 'tasks',
        value: cleanup.tasks
      }
    ];
    return this.http.patch<Cleanup>(this.globals.url + '/cleanup/' + _id, body, this.httpOptions);
  }

  removeCleanup(_id: string): any {
    return this.http.delete(this.globals.url + '/cleanup/' + _id, this.httpOptions);
  }
}
