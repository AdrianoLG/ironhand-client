import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DrinksService } from 'src/app/services/drinks/drinks.service';
import { Drink } from 'src/app/models/drink';

@Component({
  selector: 'app-drink-update',
  templateUrl: './drink-update.component.html',
  styleUrls: ['./drink-update.component.scss']
})
export class DrinkUpdateComponent implements OnInit {
  alcohol: boolean;
  drink: Drink;
  updateDrinkForm: FormGroup;
  private _id: string;

  constructor(
    private _drinksService: DrinksService,
    private _location: Location,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._id = this._route.snapshot.paramMap.get('_id');
    this._drinksService.getDrink(this._id)
      .subscribe(drink => {
        this.drink = drink;
        this.updateDrinkForm = this._formBuilder.group({
          name: ['', [Validators.required]],
          brand: ['', []],
          category: ['', [Validators.required]],
          alcohol: [false, []],
          graduation: [, []],
          img: ['', []],
          qty: [, [Validators.required]],
          unit: [, [Validators.required]],
          productQty: [, []],
        });
        this.updateDrinkForm.patchValue({
          name: drink.name,
          brand: drink.brand,
          category: drink.category,
          graduation: drink.graduation,
          img: drink.img,
          qty: drink.qty,
          unit: drink.unit,
          productQty: drink.productQty
        });
        this.alcohol = drink.alcohol;
      });
  }

  updateDrink() {
    this.drink = {
      _id: null,
      name: this.updateDrinkForm.value.name,
      brand: this.updateDrinkForm.value.brand,
      category: this.updateDrinkForm.value.category,
      alcohol: this.alcohol,
      graduation: this.updateDrinkForm.value.graduation,
      img: this.updateDrinkForm.value.img,
      qty: this.updateDrinkForm.value.qty,
      unit: this.updateDrinkForm.value.unit,
      productQty: this.updateDrinkForm.value.productQty,
    };
    this._drinksService.updateDrink(this._id, this.drink)
      .subscribe(() => {
        this.goBack();
      }, error => {
        console.log(error);
      });
  }

  goBack(): void {
    this._location.back();
  }

}
