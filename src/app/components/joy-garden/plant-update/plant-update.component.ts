import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { JGPlant } from 'src/app/models/jg-plant';
import { JgPlantsService } from 'src/app/services/jg-plants/jg-plants.service';
import { JgSeedsService } from 'src/app/services/jg-seeds/jg-seeds.service';
import { JGSeed } from 'src/app/models/jg-seed';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-plant-update',
	templateUrl: './plant-update.component.html',
	styleUrls: [ './plant-update.component.scss' ]
})
export class PlantUpdateComponent implements OnInit {
	updatePlantForm: FormGroup;
	plant: JGPlant;
	availableSeeds: JGSeed[] = [];
	_id: string;

	constructor(
		private _plantsService: JgPlantsService,
		private _seedsService: JgSeedsService,
		private _location: Location,
		private _formBuilder: FormBuilder,
		private _route: ActivatedRoute
	) {}

	ngOnInit() {
		this._id = this._route.snapshot.paramMap.get('_id');
		this._plantsService.getPlant(this._id).subscribe(plant => {
			this.plant = plant;
			console.log(this.plant);

			this.updatePlantForm = this._formBuilder.group({
				seedId: [ '', [ Validators.required ] ],
				name: [ '', [ Validators.required ] ],
				container: [ '', [ Validators.required ] ],
				coords: [ '', [ Validators.required ] ],
				gallery: [ '', [] ]
			});

			this.plant.seedId = plant.seedId;

			this.updatePlantForm.patchValue({
				seedId: plant.seedId,
				name: plant.name,
				container: plant.container,
				coords: plant.coords,
				gallery: plant.gallery
			});

			this._seedsService.getSeeds().subscribe(res => {
				for (let seed of res.seeds) {
					this.availableSeeds.push(seed);
				}
			});
		});
	}

	goBack(): void {
		this._location.back();
	}

	updatePlant(): void {
		if (this.updatePlantForm.invalid) {
			return;
		}
		this.plant = {
			seedId: this.updatePlantForm.value.seedId,
			name: this.updatePlantForm.value.name,
			container: this.updatePlantForm.value.container,
			coords: this.updatePlantForm.value.coords,
			gallery: this.updatePlantForm.value.gallery
		};
		this._plantsService.updatePlant(this._id, this.plant).subscribe(
			() => {
				this.goBack();
			},
			error => {
				console.log(error);
			}
		);
	}
}
