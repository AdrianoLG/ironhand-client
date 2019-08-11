import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { VisibleBarService } from './visible-bar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private message: string;

  constructor(private _router: Router, private visibleBarService: VisibleBarService ) {}

  clear(): void {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    const isAuth = localStorage.getItem('token') != null && !this.isTokenExpired()
    && localStorage.getItem('token') != 'undefined';
    if(isAuth) {
      this.visibleBarService.setVisibleBar(true);
      return true;
    }
  }

  isTokenExpired(): boolean {
    return false;
  }

  login(token): void {
    this.clear();
    localStorage.setItem('token', token);
    this.visibleBarService.setVisibleBar(true);

    this._router.navigate(['/']);
  }

  logout(): void {
    this.clear();
    this._router.navigate(['/login']);
  }

  decode() {
    return decode(localStorage.getItem('token'));
  }
}
