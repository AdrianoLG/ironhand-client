import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Plant } from 'src/app/models/Plant';
import { PlantsService } from 'src/app/services/plants/plants.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-watering-create',
  templateUrl: './watering-create.component.html',
  styleUrls: ['./watering-create.component.scss']
})
export class WateringCreateComponent implements OnInit {

  addWateringForm: FormGroup;
  plant: Plant;
  fertilized: boolean;
  private _id: string;

  constructor(
    private _plantsService: PlantsService,
    private _location: Location,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._id = this._route.snapshot.paramMap.get('_id');
    this.addWateringForm = this._formBuilder.group({
      date: ['', [Validators.required]]
    });
    this.fertilized = false;
  }

  goBack(): void {
    this._location.back();
  }

  saveWatering(): void {
    if (this.addWateringForm.invalid) {
      return;
    }

    let waterings = [];
    this._plantsService.getPlant(this._id).subscribe(plant => {
      waterings = plant.watering;
      waterings.push({
        date: this.addWateringForm.value.date,
        fertilized: this.fertilized
      });
      plant.watering = waterings;
      this._plantsService.updatePlant(this._id, plant).subscribe(() => {
        this.goBack();
      }, error => {
        console.log(error);
      });
    });
  }

}
