import { Component, OnInit } from '@angular/core';
import { PlantsService } from 'src/app/services/plants/plants.service';
import { Plant } from 'src/app/models/plant';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-plant-detail',
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.scss']
})
export class PlantDetailComponent implements OnInit {
  plant: Plant;
  mainImg: string;
  public id: string;

  constructor(
    private _plantsService: PlantsService,
    private _route: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit() {
    this.id = this._route.snapshot.paramMap.get('_id');
    this._plantsService.getPlant(this.id).subscribe(plant => {
      this.plant = plant;
      this.mainImg = this.plant.gallery[0];
    });
  }

  goBack(): void {
    this._location.back();
  }

  deletePlant(): void {
    this._plantsService.removePlant(this.id)
    .subscribe(() => {
      this.goBack();
    }, error => {
      console.log(error);
    });
  }

  removeWatering(wateringDate): void {
    const waterings = this.plant.watering;
    for (const watering of waterings) {
      if (watering.date === wateringDate) {
        const index = waterings.indexOf(watering, 0);
        if (index > -1) {
          waterings.splice(index, 1);
        }
      }
    }
    this.plant.watering = waterings;
    this._plantsService.updatePlant(this.id, this.plant).subscribe(() => {
      this._plantsService.getPlant(this.id).subscribe(plant => {
        this.plant = plant;
      });
    });
  }

  removeTransplant(transplant): void {
    const transplants = this.plant.transplant;
    for (const t of transplants) {
      if (t === transplant) {
        const index = transplants.indexOf(transplant, 0);
        if (index > -1) {
          transplants.splice(index, 1);
        }
      }
    }
    this.plant.transplant = transplants;
    this._plantsService.updatePlant(this.id, this.plant).subscribe(() => {
      this._plantsService.getPlant(this.id).subscribe(plant => {
        this.plant = plant;
      });
    });
  }

  toggleImage(image) {
    this.mainImg = image;
  }

  transplantSortBy(prop: string) {
    return this.plant.transplant.sort((a, b) => a[prop] < b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }

  wateringSortBy(prop: string) {
    return this.plant.watering.sort((a, b) => a[prop] < b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }

}
