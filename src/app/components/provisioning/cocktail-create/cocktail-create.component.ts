import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChipItem } from 'src/app/models/chip-item';
import { Cocktail } from 'src/app/models/cocktail';
import { CocktailsService } from 'src/app/services/cocktails/cocktails.service';

@Component({
  selector: 'app-cocktail-create',
  templateUrl: './cocktail-create.component.html',
  styleUrls: ['./cocktail-create.component.scss']
})
export class CocktailCreateComponent implements OnInit {
  ingredients = [];
  mixSelectable = true;
  mixRemovable = true;
  mixAddOnBlur = true;
  mixtureItems: ChipItem[] = [];
  addCocktailForm: FormGroup;
  cocktail: Cocktail;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private _cocktailsService: CocktailsService,
    private _location: Location,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.addCocktailForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      img: ['', []]
    });
    this.ingredients = [1];
  }

  goBack(): void {
    this._location.back();
  }

  addItem(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.mixtureItems.push({ name: value.trim() });
    }

    if (input) {
      input.value = '';
    }
  }

  removeItem(item: ChipItem): void {
    this.mixtureItems.splice(this.mixtureItems.indexOf(item), 1);
  }

  addIngredient() {
    const max = this.ingredients.length;
    this.ingredients.push(max + 1);
  }

  removeIngredient() {
    this.ingredients.pop();
  }

  saveCocktail(): void {
    if (this.addCocktailForm.invalid) {
      return;
    }
    const mixItems: string[] = [];
    for (const mixtureItem of this.mixtureItems) {
      mixItems.push(mixtureItem.name);
    }
    this.cocktail = {
      _id: null,
      name: this.addCocktailForm.value.name,
      img: this.addCocktailForm.value.img,
      ingredients: this.ingredients,
      mixture: mixItems
    };
    this._cocktailsService.addCocktail(this.cocktail).subscribe(() => {
      this.goBack();
    }, error => {
      console.log(error);
    });
  }

}
