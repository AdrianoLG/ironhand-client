import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { JGSeed } from 'src/app/models/jg-seed';
import { JgSeedsService } from 'src/app/services/jg-seeds/jg-seeds.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-seed-update',
	templateUrl: './seed-update.component.html',
	styleUrls: ['./seed-update.component.scss']
})
export class SeedUpdateComponent implements OnInit {
	updateSeedForm: FormGroup;
	seed: JGSeed;
	_id: string;

	constructor(
		public router: Router,
		private _seedsService: JgSeedsService,
		private _location: Location,
		private _formBuilder: FormBuilder,
		private _route: ActivatedRoute
	) { }

	ngOnInit() {
		this._id = this._route.snapshot.paramMap.get('_id');

		this._seedsService.getSeed(this._id).subscribe(seed => {
			this.seed = seed;
			console.log(this.seed);

			this.updateSeedForm = this._formBuilder.group({
				name: ['', [Validators.required]],
				bank: ['', [Validators.required]],
				img: ['', []],
				genetic: ['', []],
				indicaSativa: ['', [Validators.required]],
				productivity: ['', [Validators.required]],
				flowering: ['', [Validators.required]],
				height: [, [Validators.required, Validators.min(0), Validators.max(200)]],
				effect: ['', []],
				aroma: ['', []]
			});

			this.updateSeedForm.patchValue({
				name: seed.name,
				bank: seed.bank,
				img: seed.img,
				genetic: seed.genetic,
				indicaSativa: seed.indicaSativa,
				productivity: seed.productivity,
				flowering: seed.flowering,
				height: seed.height,
				effect: seed.effect,
				aroma: seed.aroma
			});
		});
	}

	goBack(): void {
		this._location.back();
	}

	updateSeed(): void {
		if (this.updateSeedForm.invalid) {
			return;
		}
		this.seed = {
			_id: this._id,
			name: this.updateSeedForm.value.name,
			bank: this.updateSeedForm.value.bank,
			img: this.updateSeedForm.value.img,
			genetic: this.updateSeedForm.value.genetic,
			indicaSativa: this.updateSeedForm.value.indicaSativa,
			productivity: this.updateSeedForm.value.productivity,
			flowering: this.updateSeedForm.value.flowering,
			height: this.updateSeedForm.value.height,
			effect: this.updateSeedForm.value.effect,
			aroma: this.updateSeedForm.value.aroma
		};
		this._seedsService.updateSeed(this._id, this.seed).subscribe(
			() => {
				this.goBack();
			},
			error => {
				console.log(error);
			}
		);
	}

	deleteSeed(): void {
		this._seedsService.removeSeed(this._id).subscribe(
			() => {
				this.router.navigate(['/jardin-de-la-alegria']);
			},
			error => {
				console.log(error);
			}
		);
	}
}
