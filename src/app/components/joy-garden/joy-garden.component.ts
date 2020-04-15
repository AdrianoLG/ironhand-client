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
  gallery: Array<any>;

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
      this.gallery = [];
      for (let plant of this.plants) {
        if (plant.gallery[0] != '') {
          this.gallery.push({ name: plant.name, pic: plant.gallery[0] });
        }
      }
    });
    this._seedsService.getSeeds().subscribe(seeds => {
      this.seedsCount = seeds.count;
      this.seeds = seeds.seeds;
    });
  }

  addSomething(): void {
    switch (this.selectedIndex) {
      case 0:
        this.router.navigate(['jardin-de-la-alegria/riegos/crear']);
        break;
        case 1:
        if (this.selectedIndex2 === 0) {
          this.router.navigate(['jardin-de-la-alegria/plantas/crear']);
        } else if (this.selectedIndex2 === 1) {
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
  }

  changeSelectedIndex2($event): void {
    const tabIndex = $event.index;
    this.selectedIndex2 = tabIndex;
    this.currentTabs[this.tabGroup2].selected = tabIndex;
  }

  // Changes selected tab - swipes
  changeSection(tabIndex): void {
    this.selectedIndex = tabIndex;
    this.currentTabs[this.tabGroup].selected = tabIndex;
    this._selectedTabService.changeTabs(this.currentTabs);
  }

  // Changes selected tab - swipes
  changeSection2(tabIndex): void {
    this.selectedIndex2 = tabIndex;
    this.currentTabs[this.tabGroup2].selected = tabIndex;
    this._selectedTabService.changeTabs(this.currentTabs);
  }

  // If exists it stablishes the next tab
  nextSection() {
    if (this.selectedIndex == 0) {
      this.changeSection(1);
      this.changeSection2(0);
    } else if (this.selectedIndex == 1 && this.selectedIndex2 == 0) {
      this.changeSection2(1);
    }
  }

  // If exists it stablishes the previous tab
  previousSection() {
    if (this.selectedIndex == 1 && this.selectedIndex2 == 1) {
      this.changeSection2(0);
    } else if (this.selectedIndex == 1 && this.selectedIndex2 == 0) {
      this.changeSection(0);
    }
  }

}
