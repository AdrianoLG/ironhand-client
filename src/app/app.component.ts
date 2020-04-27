import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './services/auth.service';
import { UserService } from './services/users/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav')
  sidenav: MatSidenav;
  title = 'Iron Hand';
  visibleBar = true;
  opened = false;
  user: string;
  date: Date;

  constructor(
    public _router: Router,
    private _authService: AuthService,
    private _userService: UserService
  ) { }

  ngOnInit() {
    if (window.location.href.includes('login')) {
      this.visibleBar = false;
    } else {
      this.visibleBar = true;
    }
    this.date = new Date();
  }

  toggleSidenav() {
    if (!this.user) {
      this.user = this._userService.getUser();
    }
    this.opened = !this.opened;
  }
}
