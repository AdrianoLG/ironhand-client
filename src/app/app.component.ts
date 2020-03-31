import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { MenuService } from './services/menu/menu.service';
import { TodosService } from './services/todos/todos.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/users/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Iron Hand';
  visibleBar = true;
  opened = false;
  @ViewChild('sidenav')
  sidenav: MatSidenav;
  menuItems: object[];
  user: string;
  date: Date;

  constructor(
    public _router: Router,
    private _authService: AuthService,
    private _menuService: MenuService,
    private _todosService: TodosService,
    private _userService: UserService
  ) { }

  ngOnInit() {
    if (window.location.href.includes('login')) {
      this.visibleBar = false;
    } else {
      this.visibleBar = true;
    }
    this._menuService.currentMenuItems.subscribe(
      menuItems => {
        this.menuItems = menuItems;
      },
      error => {
        console.log(error);
      }
    );
    this._authService.logout();
    this.date = new Date();
  }

  toggleSidenav() {
    if (!this.user) {
      this.user = this._userService.getUser();
    }
    this.opened = !this.opened;
  }

  selectMenuItem(menuItem) {
    switch (menuItem) {
      case 'Borrar completadas':
        this._todosService.deleteCompleted().subscribe(message => {
          this._menuService.refreshIt();
          this._router.navigateByUrl('/', { skipLocationChange: true });
          this._router.navigate(['/tareas']);
        });
        break;
      default:
        console.log(menuItem);
        break;
    }
  }
}
