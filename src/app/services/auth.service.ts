import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { VisibleBarService } from './visible-bar.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _router: Router, private visibleBarService: VisibleBarService, private location: Location ) {}

  clear(): void {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    const isAuth = localStorage.getItem('token') != null && !this.isTokenExpired()
    && localStorage.getItem('token') !== 'undefined' && localStorage.getItem('token') !== '';
    if (isAuth) {
      this.visibleBarService.setVisibleBar(true);
      return true;
    }
  }

  isTokenExpired(): boolean {
    return false;
  }

  login(token: string): void {
    this.clear();
    localStorage.setItem('token', token);
    this.visibleBarService.setVisibleBar(true);
    this.location.back();
  }

  logout(): void {
    this.clear();
    this._router.navigate(['/login']);
  }

  decode() {
    return decode(localStorage.getItem('token'));
  }
}
