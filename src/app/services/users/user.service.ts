import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../models/login-response';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  user: string;

  constructor(
    private http: HttpClient,
    private globals: Globals
  ) { }


  public getToken(user): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      this.globals.url + '/user/login',
      '{"email": "' + user.email + '", "password": "' + user.password + '"}',
      this.httpOptions
    );
  }

  public setUser(user) {
    this.user = user;
  }

  public getUser() {
    return this.user;
  }

  public registerUser(user) {
    return this.http.post<any>(this.globals.url + '/user/signup', user, this.httpOptions);
  }
}
