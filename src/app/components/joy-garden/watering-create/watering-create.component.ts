import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { JGWatering } from 'src/app/models/jg-watering';
import { JgWateringsService } from 'src/app/services/jg-waterings/jg-waterings.service';
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'app-watering-create',
  templateUrl: './watering-create.component.html',
  styleUrls: ['./watering-create.component.scss']
})
export class WateringCreateComponent implements OnInit {

  addWateringForm: FormGroup;
  watering: JGWatering;

  constructor(
    private _wateringsService: JgWateringsService,
    private _location: Location,
    private _formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>
  ) {}

  ngOnInit() {
    this._adapter.setLocale('es');
    this.addWateringForm = this._formBuilder.group({
      container: ['', [
        Validators.required
      ]],
      date: ['', [
        Validators.required
      ]],
      grow: [0, [
        Validators.min(0)
      ]],
      flower: [0, [
        Validators.min(0)
      ]],
      root: [0, [
        Validators.min(0)
      ]],
      powerzyme: [0, [
        Validators.min(0)
      ]],
      supervit: [0, [
        Validators.min(0)
      ]],
      delta9: [0, [
        Validators.min(0)
      ]],
      boost: [0, [
        Validators.min(0)
      ]],
      pk1314: [0, [
        Validators.min(0)
      ]]
    });
  }

  goBack(): void {
    this._location.back();
  }

  saveWatering(): void {
    if (this.addWateringForm.invalid) {
      return;
    }
    this.watering = {
      container: this.addWateringForm.value.container,
      date: this.addWateringForm.value.date,
      fertilizer: {
        grow: this.addWateringForm.value.grow,
        flower: this.addWateringForm.value.flower,
        root: this.addWateringForm.value.root,
        powerzyme: this.addWateringForm.value.powerzyme,
        supervit: this.addWateringForm.value.supervit,
        delta9: this.addWateringForm.value.delta9,
        boost: this.addWateringForm.value.boost,
        pk1314: this.addWateringForm.value.pk1314
      }
    };
    this._wateringsService.addWatering(this.watering).subscribe(() => {
      this.goBack();
    }, error => {
      console.log(error);
    });
  }

}
