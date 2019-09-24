import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JGSeed } from 'src/app/models/jg-seed';
import { Globals } from '../globals';

export interface JGSeedsResponse {
  count: number;
  seeds: JGSeed[];
}

@Injectable({
  providedIn: 'root'
})
export class JgSeedsService {

  response;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };

  constructor(private http: HttpClient, private globals: Globals) {}

  getSeeds(): Observable<JGSeedsResponse> {
    return this.http.get<JGSeedsResponse>(this.globals.url + '/joy-garden/seeds', this.httpOptions);
  }

  getSeed(_id: string): Observable<JGSeed> {
    return this.http.get<JGSeed>(this.globals.url + '/joy-garden/seeds/' + _id, this.httpOptions);
  }

  addSeed(seed: JGSeed): Observable<any> {
    return this.http.post<JGSeed>(this.globals.url + '/joy-garden/seeds', seed, this.httpOptions);
  }

  updateSeed(_id: string, seed: JGSeed) {
    const body = [
      {
        propName: 'name',
        value: seed.name
      },
      {
        propName: 'bank',
        value: seed.bank
      },
      {
        propName: 'img',
        value: seed.img
      },
      {
        propName: 'genetic',
        value: seed.genetic
      },
      {
        propName: 'indicaSativa',
        value: seed.indicaSativa
      },
      {
        propName: 'productivity',
        value: seed.productivity
      },
      {
        propName: 'flowering',
        value: seed.flowering
      },
      {
        propName: 'height',
        value: seed.height
      },
      {
        propName: 'effect',
        value: seed.effect
      },
      {
        propName: 'aroma',
        value: seed.aroma
      }
    ];
    return this.http.patch<JGSeed>(this.globals.url + '/joy-garden/seeds/' + _id, body, this.httpOptions);
  }

  removeSeed(_id: string): any {
    return this.http.delete(this.globals.url + '/joy-garden/seeds/' + _id, this.httpOptions);
  }
}
