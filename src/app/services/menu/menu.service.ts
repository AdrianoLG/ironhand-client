import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MenuService {

  private menuItems = new BehaviorSubject<object[]>([
    {
      name: 'Cerrar sesión',
      icon: 'logout'
    },
    {
      name: 'Check voicemail',
      icon: 'voicemail'
    },
    {
      name: 'Disable alerts',
      icon: 'notifications off'
    }
  ]);
  public currentMenuItems = this.menuItems.asObservable();
  private refresh = new BehaviorSubject<boolean>(false);
  public needRefresh = this.refresh.asObservable();

  constructor() { }

  changeMenuItems(menuItems: object[]) {
    this.menuItems.next(menuItems);
  }

  refreshIt() {
    this.refresh.next(true);
  }

}
