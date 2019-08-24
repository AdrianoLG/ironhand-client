import { Component, OnInit } from '@angular/core';
import { SelectedTabService, Tab } from 'src/app/services/tabs/selected-tab.service';

@Component({
  selector: 'app-culture',
  templateUrl: './culture.component.html',
  styleUrls: ['./culture.component.scss']
})
export class CultureComponent implements OnInit {

  selectedIndex: number;
  currentTabs: Tab[];

  constructor(
    private _selectedTabService: SelectedTabService
  ) { }

  ngOnInit() {
    this._selectedTabService.currentTabs.subscribe(currentTabs => {
      this.currentTabs = currentTabs;
      for (const currentTab of currentTabs) {
        if (currentTab.name === 'culture') {
          this.selectedIndex = currentTab.selected;
        }
      }
    });
  }

  changeSelectedIndex($event): void {
    const tabIndex = this.currentTabs.findIndex(tab => tab.name === $event.index);
    let tabValue: number;
    switch ($event.index) {
      case 'Libros':
        tabValue = 0;
        break;
      case 'Libros':
        tabValue = 1;
        break;
      case 'Libros':
        tabValue = 2;
        break;
      default:
        console.log('No value');
    }
    this.currentTabs[tabIndex].selected = tabValue;

    this._selectedTabService.changeTabs(this.currentTabs);
    this.selectedIndex = $event.index;
  }

}
