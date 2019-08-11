import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
	title = 'Iron Hand';
	visibleBar = true;

	constructor(public router: Router) { }

	ngOnInit() {
		if (window.location.href.includes('login')) {
			this.visibleBar = false;
		} else {
			this.visibleBar = true;
		}
	}

	opened = false;
	@ViewChild('sidenav', { static: false }) sidenav: MatSidenav;

	toggleSidenav() {
		this.opened = !this.opened;
	}

}
