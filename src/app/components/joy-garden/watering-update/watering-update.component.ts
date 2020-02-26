import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { JGWatering } from 'src/app/models/jg-watering';
import { JgWateringsService } from 'src/app/services/jg-waterings/jg-waterings.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-watering-update',
	templateUrl: './watering-update.component.html',
	styleUrls: ['./watering-update.component.scss']
})
export class WateringUpdateComponent implements OnInit {
	updateWateringForm: FormGroup;
	watering: JGWatering;
	_id: string;

	constructor(
		private _wateringsService: JgWateringsService,
		private _location: Location,
		private _formBuilder: FormBuilder,
		private _route: ActivatedRoute
	) { }

	ngOnInit() {
		this._id = this._route.snapshot.paramMap.get('_id');
		this._wateringsService.getWatering(this._id).subscribe(watering => {
			this.watering = watering;
			console.log(this.watering);

			this.updateWateringForm.patchValue({
				container: watering.container,
				date: watering.date,
				grow: watering.fertilizer[0].grow,
				flower: watering.fertilizer[0].flower,
				root: watering.fertilizer[0].root,
				powerzyme: watering.fertilizer[0].powerzyme,
				supervit: watering.fertilizer[0].supervit,
				delta9: watering.fertilizer[0].delta9,
				boost: watering.fertilizer[0].boost,
				pk1314: watering.fertilizer[0].pk1314
			});
		});
		this.updateWateringForm = this._formBuilder.group({
			container: ['', [Validators.required]],
			date: ['', [Validators.required]],
			grow: [0, [Validators.min(0)]],
			flower: [0, [Validators.min(0)]],
			root: [0, [Validators.min(0)]],
			powerzyme: [0, [Validators.min(0)]],
			supervit: [0, [Validators.min(0)]],
			delta9: [0, [Validators.min(0)]],
			boost: [0, [Validators.min(0)]],
			pk1314: [0, [Validators.min(0)]]
		});
	}

	goBack(): void {
		this._location.back();
	}

	updateWatering(): void {
		if (this.updateWateringForm.invalid) {
			return;
		}
		this.watering = {
			container: this.updateWateringForm.value.container,
			date: this.updateWateringForm.value.date,
			fertilizer: {
				grow: this.updateWateringForm.value.grow,
				flower: this.updateWateringForm.value.flower,
				root: this.updateWateringForm.value.root,
				powerzyme: this.updateWateringForm.value.powerzyme,
				supervit: this.updateWateringForm.value.supervit,
				delta9: this.updateWateringForm.value.delta9,
				boost: this.updateWateringForm.value.boost,
				pk1314: this.updateWateringForm.value.pk1314
			}
		};
		this._wateringsService.updateWatering(this._id, this.watering).subscribe(
			() => {
				this.goBack();
			},
			error => {
				console.log(error);
			}
		);
	}

	deleteWatering(): void {
		this._wateringsService.removeWatering(this._id).subscribe(
			response => {
				this.goBack();
			},
			error => {
				console.log(error);
			}
		);
	}
}
