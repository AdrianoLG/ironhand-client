import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { JGSeed } from 'src/app/models/jg-seed';
import { JgSeedsService } from 'src/app/services/jg-seeds/jg-seeds.service';

@Component({
  selector: 'app-seed-create',
  templateUrl: './seed-create.component.html',
  styleUrls: ['./seed-create.component.scss']
})
export class SeedCreateComponent implements OnInit {

  addSeedForm: FormGroup;
  seed: JGSeed;

  constructor(
    private _seedsService: JgSeedsService,
    private _location: Location,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.addSeedForm = this._formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      bank: ['', [
        Validators.required
      ]],
      img: ['', []],
      genetic: ['', []],
      indicaSativa: ['', [
        Validators.required
      ]],
      productivity: ['', [
        Validators.required
      ]],
      flowering: ['', [
        Validators.required
      ]],
      height: [, [
        Validators.required,
        Validators.min(0),
        Validators.max(200)
      ]],
      effect: ['', []],
      aroma: ['', []]
    });
  }

  goBack(): void {
    this._location.back();
  }

  saveSeed(): void {
    if (this.addSeedForm.invalid) {
      return;
    }
    this.seed = {
      _id: null,
      name: this.addSeedForm.value.name,
      bank: this.addSeedForm.value.bank,
      img: this.addSeedForm.value.img,
      genetic: this.addSeedForm.value.genetic,
      indicaSativa: this.addSeedForm.value.indicaSativa,
      productivity: this.addSeedForm.value.productivity,
      flowering: this.addSeedForm.value.flowering,
      height: this.addSeedForm.value.height,
      effect: this.addSeedForm.value.effect,
      aroma: this.addSeedForm.value.aroma
    };
    this._seedsService.addSeed(this.seed).subscribe(() => {
      this.goBack();
    }, error => {
      console.log(error);
    });
  }

}
