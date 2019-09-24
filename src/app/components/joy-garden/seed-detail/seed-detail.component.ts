import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { JgSeedsService } from 'src/app/services/jg-seeds/jg-seeds.service';
import { JGSeed } from 'src/app/models/jg-seed';

@Component({
  selector: 'app-seed-detail',
  templateUrl: './seed-detail.component.html',
  styleUrls: ['./seed-detail.component.scss']
})
export class SeedDetailComponent implements OnInit {

  seed: JGSeed;
  private _id: string;

  constructor(
    private _seedsService: JgSeedsService,
    private _route: ActivatedRoute,
    private _location: Location
  ) {}

  ngOnInit() {
    this._id = this._route.snapshot.paramMap.get('_id');
    this._seedsService.getSeed(this._route.snapshot.paramMap.get('_id')).subscribe(seed => {
      this.seed = seed;
    });
  }

  goBack(): void {
    this._location.back();
  }

}
