import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Cocktail } from 'src/app/models/cocktail';
import { CocktailsService } from 'src/app/services/cocktails/cocktails.service';

@Component({
  selector: 'app-cocktail-detail',
  templateUrl: './cocktail-detail.component.html',
  styleUrls: ['./cocktail-detail.component.scss']
})
export class CocktailDetailComponent implements OnInit {
  cocktail: Cocktail;
  private _id: string;

  constructor(
    private _cocktailsService: CocktailsService,
    private _route: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit() {
    this._id = this._route.snapshot.paramMap.get('_id');
    this._cocktailsService.getCocktail(this._id)
      .subscribe(cocktail => {
        this.cocktail = cocktail;
      });
  }

  goBack(): void {
    this._location.back();
  }

  deleteFood(): void {
    this._cocktailsService.removeCocktail(this._id).subscribe(res => {
      this.goBack();
    });
  }

}
