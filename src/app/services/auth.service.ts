import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import decode from 'jwt-decode';
import { VisibleBarService } from './visible-bar.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private previousUrl: string = undefined;
  private currentUrl: string = undefined;

  constructor(
    private _router: Router,
    private _visibleBarService: VisibleBarService,
    private _location: Location,
  ) {
    this.currentUrl = this._router.url;
    _router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  clear(): void {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  login(token: string): void {
    if (!this.isAuthenticated()) {
      localStorage.setItem('token', token);
      this._visibleBarService.setVisibleBar(true);
    }
    if (this.previousUrl === '' || this.previousUrl === '/login' || this.previousUrl == null) {
      this._router.navigate(['/']);
    } else {
      this._location.back();
    }
  }

  logout(): void {
    this.clear();
    this._router.navigate(['/login']);
  }

  decode() {
    return decode(localStorage.getItem('token'));
  }
}
