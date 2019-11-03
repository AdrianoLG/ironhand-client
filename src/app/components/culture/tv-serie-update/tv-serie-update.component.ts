import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ChipItem } from 'src/app/models/chip-item';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent, DateAdapter } from '@angular/material';
import { TvSeriesService } from 'src/app/services/tv-series/tv-series.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TvSerie } from 'src/app/models/tv-serie';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tv-serie-update',
  templateUrl: './tv-serie-update.component.html',
  styleUrls: ['./tv-serie-update.component.scss']
})
export class TvSerieUpdateComponent implements OnInit {
  updateTvSerieForm: FormGroup;
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
  private _id: string;

  constructor(
    private _tvSeriesService: TvSeriesService,
    private _location: Location,
    private _formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._id = this._route.snapshot.paramMap.get('_id');
    this._adapter.setLocale('es');
    this._tvSeriesService.getTvSerie(this._id)
    .subscribe(tvSerie => {
      this.tvSerie = tvSerie;
      for (const actor of this.tvSerie.cast) {
        this.castItems.push({ name: actor });
      }
      for (const category of this.tvSerie.categories) {
        this.categoriesItems.push({ name: category });
      }
      this.ended = tvSerie.ended;
      this.updateTvSerieForm = this._formBuilder.group({
        title: ['', [Validators.required]],
        director: ['', [Validators.required]],
        cast: [[], []],
        tv: ['', []],
        country: ['', []],
        beginDate: ['', []],
        lastSeen: ['', [Validators.required]],
        ended: ['', []],
        endDate: ['', []],
        categories: [[], []],
        episodeDuration: [0, []],
        img: ['', []]
      });
      this.updateTvSerieForm.patchValue({
        title: tvSerie.title,
        director: tvSerie.director,
        tv: tvSerie.tv,
        country: tvSerie.country,
        beginDate: tvSerie.beginDate,
        lastSeen: tvSerie.lastSeen,
        ended: tvSerie.ended,
        endDate: tvSerie.endDate,
        episodeDuration: tvSerie.episodeDuration,
        img: tvSerie.img,
      });
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

  updateTvSerie(): void {
    const castItems: string[] = [];
    for (const castItem of this.castItems) {
      castItems.push(castItem.name);
    }
    const categoriesItems: string[] = [];
    for (const categorieItem of this.categoriesItems) {
      categoriesItems.push(categorieItem.name);
    }
    if (this.updateTvSerieForm.invalid) {
      return;
    }
    this.tvSerie = {
      _id: null,
      title: this.updateTvSerieForm.value.title,
      director: this.updateTvSerieForm.value.director,
      cast: castItems,
      tv: this.updateTvSerieForm.value.tv,
      country: this.updateTvSerieForm.value.country,
      beginDate: this.updateTvSerieForm.value.beginDate,
      lastSeen: this.updateTvSerieForm.value.lastSeen,
      ended: this.ended,
      endDate: this.updateTvSerieForm.value.endDate,
      categories: categoriesItems,
      episodeDuration: this.updateTvSerieForm.value.episodeDuration,
      img: this.updateTvSerieForm.value.img
    };
    this._tvSeriesService.updateTvSerie(this._id, this.tvSerie).subscribe(() => {
        this.goBack();
      },
      error => {
        console.log(error);
      }
    );
  }

}
