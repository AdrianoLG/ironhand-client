import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Tab {
  name: string;
  selected: number;
}

@Injectable({
  providedIn: 'root'
})
export class SelectedTabService {

  private tabs = new BehaviorSubject<Tab[]>([
    {
      name: 'tasks',
      selected: 0
    }
  ]);
  public currentTabs = this.tabs.asObservable();
  private refresh = new BehaviorSubject<boolean>(false);
  public needRefresh = this.refresh.asObservable();

  constructor() { }

  changeTabs(tabs: Tab[]) {
    this.tabs.next(tabs);
  }

  refreshIt() {
    this.refresh.next(true);
  }
}
