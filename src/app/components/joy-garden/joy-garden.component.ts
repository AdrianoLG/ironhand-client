import { Component, OnInit } from '@angular/core';
import { SelectedTabService, Tab } from 'src/app/services/tabs/selected-tab.service';
import { JgWateringsService } from 'src/app/services/jg-waterings/jg-waterings.service';
import { JGWatering } from 'src/app/models/jg-watering';
import { JGPlant } from 'src/app/models/jg-plant';
import { JGSeed } from 'src/app/models/jg-seed';
import { JgSeedsService } from 'src/app/services/jg-seeds/jg-seeds.service';
import { JgPlantsService } from 'src/app/services/jg-plants/jg-plants.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-joy-garden',
  templateUrl: './joy-garden.component.html',
  styleUrls: ['./joy-garden.component.scss']
})
export class JoyGardenComponent implements OnInit {

  selectedIndex: number;
  selectedIndex2: number;
  currentTabs: Tab[];
  tabGroup: number;
  tabGroup2: number;
  waterings: JGWatering[];
  wateringsCount: number;
  plants: JGPlant[];
  plantsCount: number;
  seeds: JGSeed[];
  seedsCount: number;

  constructor(
    private _selectedTabService: SelectedTabService,
    private _wateringsService: JgWateringsService,
    private _seedsService: JgSeedsService,
    private _plantsService: JgPlantsService,
    public router: Router
  ) {}

  ngOnInit() {
    this._selectedTabService.currentTabs.subscribe(currentTabs => {
      this.currentTabs = currentTabs;
      console.log(currentTabs);
      for (const currentTab of currentTabs) {
        if (currentTab.name === 'joy-garden') {
          this.tabGroup = currentTabs.indexOf(currentTab);
          this.selectedIndex = currentTab.selected;
        }
        if (currentTab.name === 'joy-garden2') {
          this.tabGroup2 = currentTabs.indexOf(currentTab);
          this.selectedIndex2 = currentTab.selected;
        }
      }
    });
    this._wateringsService.getWaterings().subscribe(waterings => {
      this.wateringsCount = waterings.count;
      this.waterings = waterings.waterings;
    });
    this._plantsService.getPlants().subscribe(plants => {
      this.plantsCount = plants.count;
      this.plants = plants.plants;
    });
    this._seedsService.getSeeds().subscribe(seeds => {
      this.seedsCount = seeds.count;
      this.seeds = seeds.seeds;
    });
  }

  addSomething(): void {
    console.log(this.selectedIndex);
    console.log(this.selectedIndex2);
    switch (this.selectedIndex) {
      case 0:
        console.log('Case 0');
        this.router.navigate(['jardin-de-la-alegria/riegos/crear']);
        break;
        case 1:
        console.log(0);
        if (this.selectedIndex2 === 0) {
          console.log('Case 0-0');
          this.router.navigate(['jardin-de-la-alegria/plantas/crear']);
        } else if (this.selectedIndex2 === 1) {
          console.log('Case 0-1');
          this.router.navigate(['jardin-de-la-alegria/semillas/crear']);
        } else {
          console.log('Something wrong');
        }
        break;
      default:
        console.log('No more cases. Check the code.');
    }
  }

  changeSelectedIndex($event): void {
    const tabIndex = $event.index;
    this.selectedIndex = tabIndex;
    this.currentTabs[this.tabGroup].selected = tabIndex;
    this._selectedTabService.changeTabs(this.currentTabs);
    console.log(`TabGroup ${this.tabGroup}, SelectedIndex ${this.selectedIndex}, TabGroup2 ${this.tabGroup2}, SelectedIndex2 ${this.selectedIndex2}`);
  }

  changeSelectedIndex2($event): void {
    const tabIndex = $event.index;
    this.selectedIndex2 = tabIndex;
    this.currentTabs[this.tabGroup2].selected = tabIndex;
    console.log(`TabGroup ${this.tabGroup}, SelectedIndex ${this.selectedIndex}, TabGroup2 ${this.tabGroup2}, SelectedIndex2 ${this.selectedIndex2}`);
  }

}
