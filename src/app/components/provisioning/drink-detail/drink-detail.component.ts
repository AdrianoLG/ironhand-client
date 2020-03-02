import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Drink } from 'src/app/models/drink';
import { DrinksService } from 'src/app/services/drinks/drinks.service';

@Component({
  selector: 'app-drink-detail',
  templateUrl: './drink-detail.component.html',
  styleUrls: ['./drink-detail.component.scss']
})
export class DrinkDetailComponent implements OnInit {
  drink: Drink;
  private _id: string;


  constructor(
    private _drinksService: DrinksService,
    private _route: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit() {
    this._id = this._route.snapshot.paramMap.get('_id');
    this._drinksService.getDrink(this._id)
      .subscribe(drink => {
        this.drink = drink;
      });
  }

  goBack(): void {
    this._location.back();
  }

  deleteDrink(): void {
    this._drinksService.removeDrink(this._id).subscribe(res => {
      this.goBack();
    });
  }

}
