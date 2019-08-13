import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {

  constructor(
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.menuService.changeMenuItems([
      {
        name: 'Cerrar sesión',
        icon: 'logout'
      },
      {
        name: 'Ver estadísticas',
        icon: 'bar_chart'
      },
      {
        name: 'Salir',
        icon: 'exit_to_app'
      }
    ]);
  }

}
