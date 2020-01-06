import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Plant } from 'src/app/models/Plant';
import { PlantsService } from 'src/app/services/plants/plants.service';
import { DateAdapter } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transplant-create',
  templateUrl: './transplant-create.component.html',
  styleUrls: ['./transplant-create.component.scss']
})
export class TransplantCreateComponent implements OnInit {

  addTransplantForm: FormGroup;
  plant: Plant;
  private _id: string;

  constructor(
    private _plantsService: PlantsService,
    private _adapter: DateAdapter<any>,
    private _location: Location,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._id = this._route.snapshot.paramMap.get('_id');
    this._adapter.setLocale('es');
    this._adapter.getFirstDayOfWeek = () => 1;
    this.addTransplantForm = this._formBuilder.group({
      date: ['', [ Validators.required ]]
    });
  }

  goBack(): void {
    this._location.back();
  }

  saveTransplant(): void {
    if (this.addTransplantForm.invalid) {
      return;
    }

    let transplants = [];
    this._plantsService.getPlant(this._id).subscribe(plant => {
      transplants = plant.transplant;
      transplants.push(this.addTransplantForm.value.date);
      plant.transplant = transplants;
      this._plantsService.updatePlant(this._id, plant).subscribe(() => {
        this.goBack();
      }, error => {
        console.log(error);
      });
    });
  }

}
