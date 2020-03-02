import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DrinksService } from 'src/app/services/drinks/drinks.service';
import { Drink } from 'src/app/models/drink';

@Component({
  selector: 'app-drink-create',
  templateUrl: './drink-create.component.html',
  styleUrls: ['./drink-create.component.scss']
})
export class DrinkCreateComponent implements OnInit {
  alcohol: boolean;
  drink: Drink;
  addDrinkForm: FormGroup;


  constructor(
    private _drinksService: DrinksService,
    private _location: Location,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.alcohol = false;
    this.addDrinkForm = this._formBuilder.group({
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
  }

  createDrink() {
    this.drink = {
      _id: null,
      name: this.addDrinkForm.value.name,
      brand: this.addDrinkForm.value.brand,
      category: this.addDrinkForm.value.category,
      alcohol: this.alcohol,
      graduation: this.addDrinkForm.value.graduation,
      img: this.addDrinkForm.value.img,
      qty: this.addDrinkForm.value.qty,
      unit: this.addDrinkForm.value.unit,
      productQty: this.addDrinkForm.value.productQty
    };
    this._drinksService.addDrink(this.drink).subscribe(res => {
      this.goBack();
    });
  }

  goBack(): void {
    this._location.back();
  }

}
