import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ChipItem } from 'src/app/models/chip-item';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent, DateAdapter } from '@angular/material';
import { TvSeriesService } from 'src/app/services/tv-series/tv-series.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TvSerie } from 'src/app/models/tv-serie';

@Component({
  selector: 'app-tv-serie-create',
  templateUrl: './tv-serie-create.component.html',
  styleUrls: ['./tv-serie-create.component.scss']
})
export class TvSerieCreateComponent implements OnInit {
  addTvSerieForm: FormGroup;
  tvSerie: TvSerie;
  ended: boolean;
  castSelectable = true;
  castRemovable = true;
  castAddOnBlur = true;
  castItems: ChipItem[] = [];
  categoriesSelectable = true;
  categoriesRemovable = true;
  categoriesAddOnBlur = true;
  categoriesItems: ChipItem[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private _tvSeriesService: TvSeriesService,
    private _location: Location,
    private _formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>
  ) { }

  ngOnInit() {
    this._adapter.setLocale('es');
    this.addTvSerieForm = this._formBuilder.group({
      title: ['', [Validators.required]],
      director: ['', [Validators.required]],
      cast: [[], []],
      tv: ['', [Validators.required]],
      country: ['', []],
      beginDate: ['', []],
      lastSeen: ['', []],
      ended: [false, []],
      endDate: ['', []],
      categories: [[], []],
      episodeDuration: [0, []],
      img: ['', []]
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
        case 'cast':
        this.castItems.push({ name: value.trim() });
        break;
        case 'categories':
        this.categoriesItems.push({ name: value.trim() });
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
      case 'cast':
      if (this.castItems.indexOf(item) >= 0) {
        this.castItems.splice(this.castItems.indexOf(item), 1);
      }
      break;
      case 'categories':
      if (this.categoriesItems.indexOf(item) >= 0) {
        this.categoriesItems.splice(this.categoriesItems.indexOf(item), 1);
      }
      break;
      default:
      console.log('Pass a parameter');
      break;
    }
  }

  saveTvSerie(): void {
    const castItems: string[] = [];
    for (const castItem of this.castItems) {
      castItems.push(castItem.name);
    }
    const categoriesItems: string[] = [];
    for (const categorieItem of this.categoriesItems) {
      categoriesItems.push(categorieItem.name);
    }
    if (this.addTvSerieForm.invalid) {
      return;
    }
    this.tvSerie = {
      _id: null,
      title: this.addTvSerieForm.value.title,
      director: this.addTvSerieForm.value.director,
      cast: castItems,
      tv: this.addTvSerieForm.value.tv,
      country: this.addTvSerieForm.value.country,
      beginDate: this.addTvSerieForm.value.beginDate,
      lastSeen: this.addTvSerieForm.value.lastSeen,
      ended: this.ended,
      endDate: this.addTvSerieForm.value.endDate,
      categories: categoriesItems,
      episodeDuration: this.addTvSerieForm.value.episodeDuration,
      img: this.addTvSerieForm.value.img
    };
    this._tvSeriesService.addTvSerie(this.tvSerie).subscribe(
      () => {
        this.goBack();
      },
      error => {
        console.log(error);
      }
      );
    }

}
