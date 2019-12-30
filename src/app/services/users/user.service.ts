import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../models/login-response';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  user: string;

  constructor(
    private http: HttpClient,
    private globals: Globals
  ) { }


  public getToken(user): Observable<LoginResponse> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post<LoginResponse>(
      this.globals.url + '/user/login',
      '{"email": "' + user.email + '", "password": "' + user.password + '"}',
      httpOptions
    );
  }

  public setUser(user) {
    this.user = user;
  }

  public getUser() {
    return this.user;
  }
}
