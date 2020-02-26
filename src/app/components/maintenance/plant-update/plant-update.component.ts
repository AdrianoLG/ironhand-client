import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Location } from '@angular/common';
import { Plant } from 'src/app/models/Plant';
import { PlantsService } from 'src/app/services/plants/plants.service';
import { ChipItem } from 'src/app/models/chip-item';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plant-update',
  templateUrl: './plant-update.component.html',
  styleUrls: ['./plant-update.component.scss']
})
export class PlantUpdateComponent implements OnInit {

  updatePlantForm: FormGroup;
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
  wateringValues = [];
  transplants = [];
  private _id: string;

  constructor(
    private _plantsService: PlantsService,
    private _location: Location,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._id = this._route.snapshot.paramMap.get('_id');
    this.updatePlantForm = this._formBuilder.group({
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
    this._plantsService.getPlant(this._id).subscribe(plant => {
      this.plant = plant;
      this.updatePlantForm.patchValue({
        name: plant.name,
        scientific: plant.scientific,
        container: plant.container,
        zone: plant.zone,
        sun: plant.sun,
        wateringFrequency: plant.wateringFrequency,
        frost: plant.frost,
        soil: plant.soil,
        flowering: plant.flowering,
        perishable: plant.perishable,
        img: plant.img,
        death: plant.death,
        deathCause: plant.deathCause
      });
      this.wateringValues = plant.watering;
      this.transplants = plant.transplant;
      for (const origin of this.plant.origin) {
        this.originItems.push({ name: origin });
      }
      for (const gallery of this.plant.gallery) {
        this.galleryItems.push({ name: gallery });
      }
      for (const pests of this.plant.pests) {
        this.pestsItems.push({ name: pests });
      }
    });
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
          console.log('Pass a parameter');
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
        console.log('Pass a parameter');
        break;
    }
  }

  updatePlant(): void {
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
    if (this.updatePlantForm.invalid) {
      return;
    }
    this.plant = {
      _id: this._id,
      name: this.updatePlantForm.value.name,
      scientific: this.updatePlantForm.value.scientific,
      container: this.updatePlantForm.value.container,
      zone: this.updatePlantForm.value.zone,
      gallery: gaItems,
      sun: this.updatePlantForm.value.sun,
      watering: this.wateringValues,
      wateringFrequency: this.updatePlantForm.value.wateringFrequency,
      frost: this.updatePlantForm.value.frost,
      soil: this.updatePlantForm.value.soil,
      flowering: this.updatePlantForm.value.flowering,
      perishable: this.updatePlantForm.value.perishable,
      pests: peItems,
      img: this.updatePlantForm.value.img,
      origin: orItems,
      transplant: this.transplants,
      death: this.updatePlantForm.value.death,
      deathCause: this.updatePlantForm.value.deathCause
    };
    this._plantsService.updatePlant(this._id, this.plant).subscribe(() => {
      this.goBack();
    }, error => {
      console.log(error);
    });
  }
}
