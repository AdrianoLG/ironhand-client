import { Component, OnInit } from '@angular/core';
import { SelectedTabService, Tab } from 'src/app/services/tabs/selected-tab.service';
import { CleanupService } from 'src/app/services/cleanup/cleanup.service';
import { Cleanup } from 'src/app/models/cleanup';


@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {

  selectedIndex: number;
  currentTabs: Tab[];
  cleanups: Cleanup[];
  cleanupsCount: number;
  tabGroup: number;

  constructor(
    private _selectedTabService: SelectedTabService,
    private _cleanupService: CleanupService
  ) { }

  ngOnInit() {
    this._selectedTabService.currentTabs.subscribe(currentTabs => {
      this.currentTabs = currentTabs;
      for (const currentTab of currentTabs) {
        if (currentTab.name === 'maintenance') {
          this.tabGroup = currentTabs.indexOf(currentTab);
          this.selectedIndex = currentTab.selected;
        }
      }
      console.log(`TabGroup ${this.tabGroup}, SelectedIndex ${this.selectedIndex}`);
      this._cleanupService.getCleanups().subscribe(cleanups => {
        this.cleanupsCount = cleanups.count;
        this.cleanups = cleanups.cleaningTasks;
      });
    });
  }

  changeSelectedIndex($event): void {
    const tabIndex = $event.index;
    this.selectedIndex = tabIndex;
    this.currentTabs[this.tabGroup].selected = tabIndex;
    this._selectedTabService.changeTabs(this.currentTabs);
    console.log(`TabGroup ${this.tabGroup}, SelectedIndex ${this.selectedIndex}`);
  }

}
