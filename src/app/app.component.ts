import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { MenuService } from './services/menu/menu.service';
import { TodosService } from './services/todos/todos.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Iron Hand';
  visibleBar = true;
  opened = false;
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  menuItems: object[];

  constructor(
    public router: Router,
    private menuService: MenuService,
    private todosService: TodosService,
    private location: Location,
  ) { }

  ngOnInit() {
    if (window.location.href.includes('login')) {
      this.visibleBar = false;
    } else {
      this.visibleBar = true;
    }
    this.menuService.currentMenuItems.subscribe(menuItems => {
      this.menuItems = menuItems;
    }, error => {
      console.log(error);
    });
  }

  toggleSidenav() {
    this.opened = !this.opened;
  }

  selectMenuItem(menuItem) {
    switch (menuItem) {
      case 'Borrar completadas':
        alert('borrar!');
        this.todosService.deleteCompleted().subscribe(message => {
          console.log(message);
          this.menuService.refreshIt();
          this.router.navigateByUrl('/', { skipLocationChange: true });
          this.router.navigate(['/tareas']);
        });
        break;
      default:
        console.log(menuItem);
        break;
    }
    console.log('Fuera switch');
  }
}
