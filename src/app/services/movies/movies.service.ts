import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../globals';
import { Movie } from 'src/app/models/movie';

export interface MoviesResponse {
  count: number;
  movies: Movie[];
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
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

  getMovies(): Observable<MoviesResponse> {
    return this.http.get<MoviesResponse>(this.globals.url + '/video-library/movies/', this.httpOptions);
  }

  getMovie(_id: string): Observable<Movie> {
    return this.http.get<Movie>(this.globals.url + '/video-library/movies/' + _id, this.httpOptions);
  }

  addMovie(project: Movie): Observable<any> {
    return this.http.post<Movie>(this.globals.url + '/video-library/movies/', project, this.httpOptions);
  }

  updateMovie(_id: string, movie: Movie) {
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
        propName: 'year',
        value: movie.year
      },
      {
        propName: 'cast',
        value: movie.cast
      },
      {
        propName: 'categories',
        value: movie.categories
      },
      {
        propName: 'duration',
        value: movie.duration
      },
      {
        propName: 'img',
        value: movie.img
      },
      {
        propName: 'seen',
        value: movie.seen
      },
      {
        propName: 'seenDate',
        value: movie.seenDate
      },
      {
        propName: 'rating',
        value: movie.rating
      }
    ];
    return this.http.patch<Movie>(this.globals.url + '/video-library/movies/' + _id, body, this.httpOptions);
  }

  removeMovie(_id: string): any {
    return this.http.delete(this.globals.url + '/video-library/movies/' + _id, this.httpOptions);
  }
}
