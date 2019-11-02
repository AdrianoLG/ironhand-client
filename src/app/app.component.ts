import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { MenuService } from './services/menu/menu.service';
import { TodosService } from './services/todos/todos.service';
import { AuthService } from './services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
	title = 'Iron Hand';
	visibleBar = true;
	opened = false;
	@ViewChild('sidenav', { static: false })
	sidenav: MatSidenav;
	menuItems: object[];

	constructor(
		public router: Router,
		private authService: AuthService,
		private menuService: MenuService,
		private todosService: TodosService
	) {}

	ngOnInit() {
		if (window.location.href.includes('login')) {
			this.visibleBar = false;
		} else {
			this.visibleBar = true;
		}
		this.menuService.currentMenuItems.subscribe(
			menuItems => {
				this.menuItems = menuItems;
			},
			error => {
				console.log(error);
			}
		);
		this.authService.logout();
	}

	toggleSidenav() {
		this.opened = !this.opened;
	}

	selectMenuItem(menuItem) {
		switch (menuItem) {
			case 'Borrar completadas':
				this.todosService.deleteCompleted().subscribe(message => {
					console.log(message);
					this.menuService.refreshIt();
					this.router.navigateByUrl('/', { skipLocationChange: true });
					this.router.navigate([ '/tareas' ]);
				});
				break;
			default:
				console.log(menuItem);
				break;
		}
	}
}
