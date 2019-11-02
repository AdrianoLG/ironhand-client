import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { JGPlant } from 'src/app/models/jg-plant';
import { JgPlantsService } from 'src/app/services/jg-plants/jg-plants.service';
import { JgSeedsService } from 'src/app/services/jg-seeds/jg-seeds.service';
import { JGSeed } from 'src/app/models/jg-seed';

@Component({
	selector: 'app-plant-create',
	templateUrl: './plant-create.component.html',
	styleUrls: [ './plant-create.component.scss' ]
})
export class PlantCreateComponent implements OnInit {
	addPlantForm: FormGroup;
	plant: JGPlant;
	availableSeeds: JGSeed[] = [];

	constructor(
		private _plantsService: JgPlantsService,
		private _seedsService: JgSeedsService,
		private _location: Location,
		private _formBuilder: FormBuilder
	) {}

	ngOnInit() {
		this.addPlantForm = this._formBuilder.group({
			seedId: [ '', [ Validators.required ] ],
			name: [ '', [ Validators.required ] ],
			container: [ '', [ Validators.required ] ],
			coords: [ '', [ Validators.required ] ],
			gallery: [ '', [] ]
		});
		this._seedsService.getSeeds().subscribe(res => {
			for (let seed of res.seeds) {
				this.availableSeeds.push(seed);
			}
		});
	}

	goBack(): void {
		this._location.back();
	}

	savePlant(): void {
		if (this.addPlantForm.invalid) {
			return;
		}
		this.plant = {
			seedId: this.addPlantForm.value.seedId,
			name: this.addPlantForm.value.name,
			container: this.addPlantForm.value.container,
			coords: this.addPlantForm.value.coords,
			gallery: this.addPlantForm.value.gallery
		};
		this._plantsService.addPlant(this.plant).subscribe(
			() => {
				this.goBack();
			},
			error => {
				console.log(error);
			}
		);
	}
}
