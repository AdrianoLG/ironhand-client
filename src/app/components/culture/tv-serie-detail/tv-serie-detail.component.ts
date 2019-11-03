import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TvSerie } from 'src/app/models/tv-serie';
import { TvSeriesService } from 'src/app/services/tv-series/tv-series.service';

@Component({
  selector: 'app-tv-serie-detail',
  templateUrl: './tv-serie-detail.component.html',
  styleUrls: ['./tv-serie-detail.component.scss']
})
export class TvSerieDetailComponent implements OnInit {
  tvSerie: TvSerie;
  private _id: string;

  constructor(
    private _tvSeriesService: TvSeriesService,
    private _route: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit() {
    this._id = this._route.snapshot.paramMap.get('_id');
    this._tvSeriesService.getTvSerie(this._id)
      .subscribe(tvSerie => {
        this.tvSerie = tvSerie;
      });
  }

  goBack(): void {
    this._location.back();
  }

}
