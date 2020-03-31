import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Location } from '@angular/common';
import { Plant } from 'src/app/models/Plant';
import { PlantsService } from 'src/app/services/plants/plants.service';
import { ChipItem } from 'src/app/models/chip-item';

@Component({
  selector: 'app-plant-create',
  templateUrl: './plant-create.component.html',
  styleUrls: ['./plant-create.component.scss']
})
export class PlantCreateComponent implements OnInit {

  addPlantForm: FormGroup;
  plant: Plant;
  orSelectable = true;
  orRemovable = true;
  orAddOnBlur = true;
  originItems: ChipItem[] = [];
  gaSelectable = true;
  gaRemovable = true;
  gaAddOnBlur = true;
  galleryItems: ChipItem[] = [];
  peSelectable = true;
  peRemovable = true;
  peAddOnBlur = true;
  pestsItems: ChipItem[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  waterings = [];

  constructor(
    private _plantsService: PlantsService,
    private _location: Location,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.addPlantForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      scientific: ['', []],
      container: ['', [Validators.required]],
      zone: ['', [Validators.required]],
      sun: ['', [Validators.required]],
      wateringFrequency: ['', [Validators.required]],
      frost: [, []],
      soil: ['', []],
      flowering: ['', []],
      perishable: [, []],
      img: ['', []],
      death: ['', []],
      deathCause: ['', []]
    });
    this.waterings = [1];
  }

  goBack(): void {
    this._location.back();
  }

  addItem(type: string, event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      switch (type) {
        case 'origin':
          this.originItems.push({ name: value.trim() });
          break;
        case 'gallery':
          this.galleryItems.push({ name: value.trim() });
          break;
        case 'pests':
          this.pestsItems.push({ name: value.trim() });
          break;
        default:
          console.log('No more cases. Check the code');
          break;
      }
    }

    if (input) {
      input.value = '';
    }
  }

  removeItem(type: string, item: ChipItem): void {
    switch (type) {
      case 'origin':
        if (this.originItems.indexOf(item) >= 0) {
          this.originItems.splice(this.originItems.indexOf(item), 1);
        }
        break;
      case 'gallery':
        if (this.galleryItems.indexOf(item) >= 0) {
          this.galleryItems.splice(this.galleryItems.indexOf(item), 1);
        }
        break;
      case 'pests':
        if (this.pestsItems.indexOf(item) >= 0) {
          this.pestsItems.splice(this.pestsItems.indexOf(item), 1);
        }
        break;
      default:
        console.log('No more cases. Check the code');
        break;
    }
  }

  addWatering() {
    const max = this.waterings.length;
    this.waterings.push(max + 1);
  }

  removeWatering() {
    this.waterings.pop();
  }

  savePlant(): void {
    const orItems: string[] = [];
    for (const originItem of this.originItems) {
      orItems.push(originItem.name);
    }
    const gaItems: string[] = [];
    for (const galleryItem of this.galleryItems) {
      gaItems.push(galleryItem.name);
    }
    const peItems: string[] = [];
    for (const pestsItem of this.pestsItems) {
      peItems.push(pestsItem.name);
    }
    if (this.addPlantForm.invalid) {
      return;
    }
    this.plant = {
      _id: null,
      name: this.addPlantForm.value.name,
      scientific: this.addPlantForm.value.scientific,
      container: this.addPlantForm.value.container,
      zone: this.addPlantForm.value.zone,
      gallery: gaItems,
      sun: this.addPlantForm.value.sun,
      watering: [],
      wateringFrequency: this.addPlantForm.value.wateringFrequency,
      frost: this.addPlantForm.value.frost,
      soil: this.addPlantForm.value.soil,
      flowering: this.addPlantForm.value.flowering,
      perishable: this.addPlantForm.value.perishable,
      pests: peItems,
      img: this.addPlantForm.value.img,
      origin: orItems,
      transplant: [],
      death: this.addPlantForm.value.death,
      deathCause: this.addPlantForm.value.deathCause
    };
    this._plantsService.addPlant(this.plant).subscribe(() => {
      this.goBack();
    }, error => {
      console.log(error);
    });
  }

}
