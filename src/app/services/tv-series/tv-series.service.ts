import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../globals';
import { TvSerie } from 'src/app/models/tv-serie';

export interface TvSeriesResponse {
  count: number;
  tvSeries: TvSerie[];
}

@Injectable({
  providedIn: 'root'
})

export class TvSeriesService {
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

  getTvSeries(): Observable<TvSeriesResponse> {
    return this.http.get<TvSeriesResponse>(this.globals.url + '/video-library/tv-series/', this.httpOptions);
  }

  getTvSerie(_id: string): Observable<TvSerie> {
    return this.http.get<TvSerie>(this.globals.url + '/video-library/tv-series/' + _id, this.httpOptions);
  }

  addTvSerie(tvSerie: TvSerie): Observable<any> {
    return this.http.post<TvSerie>(this.globals.url + '/video-library/tv-series/', tvSerie, this.httpOptions);
  }

  updateTvSerie(_id: string, movie: TvSerie) {
    const body = [
      {
        propName: 'title',
        value: movie.title
      },
      {
        propName: 'director',
        value: movie.director
      },
      {
        propName: 'cast',
        value: movie.cast
      },
      {
        propName: 'tv',
        value: movie.tv
      },
      {
        propName: 'country',
        value: movie.country
      },
      {
        propName: 'beginDate',
        value: movie.beginDate
      },
      {
        propName: 'lastSeen',
        value: movie.lastSeen
      },
      {
        propName: 'ended',
        value: movie.ended
      },
      {
        propName: 'endDate',
        value: movie.endDate
      },
      {
        propName: 'categories',
        value: movie.categories
      },
      {
        propName: 'episodeDuration',
        value: movie.episodeDuration
      },
      {
        propName: 'img',
        value: movie.img
      },
    ];
    return this.http.patch<TvSerie>(this.globals.url + '/video-library/tv-series/' + _id, body, this.httpOptions);
  }

  removeMovie(_id: string): any {
    return this.http.delete(this.globals.url + '/video-library/tv-series/' + _id, this.httpOptions);
  }
}
