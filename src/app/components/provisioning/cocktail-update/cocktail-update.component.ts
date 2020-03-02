import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChipItem } from 'src/app/models/chip-item';
import { Cocktail } from 'src/app/models/cocktail';
import { CocktailsService } from 'src/app/services/cocktails/cocktails.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cocktail-update',
  templateUrl: './cocktail-update.component.html',
  styleUrls: ['./cocktail-update.component.scss']
})
export class CocktailUpdateComponent implements OnInit {
  ingredients = [];
  mixSelectable = true;
  mixRemovable = true;
  mixAddOnBlur = true;
  mixtureItems: ChipItem[] = [];
  updateCocktailForm: FormGroup;
  cocktail: Cocktail;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  private _id: string;

  constructor(
    private _cocktailsService: CocktailsService,
    private _location: Location,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._id = this._route.snapshot.paramMap.get('_id');
    this.updateCocktailForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      img: ['', []]
    });
    this.ingredients = [1];
    this._cocktailsService.getCocktail(this._id).subscribe(cocktail => {
      this.cocktail = cocktail;
      this.updateCocktailForm.patchValue({
        name: cocktail.name,
        img: cocktail.img
      });
      this.ingredients = cocktail.ingredients;
      for (const origin of this.cocktail.mixture) {
        this.mixtureItems.push({ name: origin });
      }
    });
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

  updateCocktail(): void {
    if (this.updateCocktailForm.invalid) {
      return;
    }
    const mixItems: string[] = [];
    for (const mixtureItem of this.mixtureItems) {
      mixItems.push(mixtureItem.name);
    }
    this.cocktail = {
      _id: null,
      name: this.updateCocktailForm.value.name,
      img: this.updateCocktailForm.value.img,
      ingredients: this.ingredients,
      mixture: mixItems
    };
    this._cocktailsService.updateCocktail(this._id, this.cocktail).subscribe(() => {
      this.goBack();
    }, error => {
      console.log(error);
    });
  }

}
