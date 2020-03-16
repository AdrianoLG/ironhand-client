import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Cocktail } from 'src/app/models/cocktail';
import { CocktailsService } from 'src/app/services/cocktails/cocktails.service';
import { CocktailIngredient } from 'src/app/models/cocktail-ingredient';

export interface Mixture {
  mixture: string;
}

@Component({
  selector: 'app-cocktail-create',
  templateUrl: './cocktail-create.component.html',
  styleUrls: ['./cocktail-create.component.scss']
})
export class CocktailCreateComponent implements OnInit {
  ingredients: CocktailIngredient[];
  ingredientIndex: number;
  ingredientFormAction: string;
  addIngredientForm: FormGroup;
  mixture: Mixture[];
  mixtureIndex: number;
  mixtureFormAction: string;
  addMixtureForm: FormGroup;
  addCocktailForm: FormGroup;
  cocktail: Cocktail;

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
    this.addIngredientForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      parts: ['', []]
    });
    this.addMixtureForm = this._formBuilder.group({
      mixture: ['', [Validators.required]]
    });
    this.ingredients = [];
    this.ingredientIndex = -1;
    this.ingredientFormAction = 'Añadir';
    this.mixture = [];
    this.mixtureIndex = -1;
    this.mixtureFormAction = 'Añadir';
  }

  goBack(): void {
    this._location.back();
  }

  addIngredient(newIngredient?: number) {
    if (newIngredient !== -1) {
      this.ingredients[this.ingredientIndex].name = this.addIngredientForm.value.name;
      this.ingredients[this.ingredientIndex].parts = this.addIngredientForm.value.parts;
      this.ingredientIndex = -1;
      this.ingredientFormAction = 'Añadir';
      this.clearIngredientForm();
    } else {
      this.ingredients.push({
        name: this.addIngredientForm.value.name,
        parts: this.addIngredientForm.value.parts
      });
      this.clearIngredientForm();
    }
  }

  editIngredient(index: number, name: string, parts: string) {
    this.ingredientIndex = index;
    this.addIngredientForm.patchValue({
      name,
      parts
    });
    this.ingredientFormAction = 'Editar';
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.clearIngredientForm();
  }

  clearIngredientForm() {
    this.addIngredientForm.patchValue({ name: '', parts: ''});
  }

  addMixture(newMixture?: number) {
    if (newMixture !== -1) {
      this.mixture[this.mixtureIndex].mixture = this.addMixtureForm.value.mixture;
      this.mixtureIndex = -1;
      this.mixtureFormAction = 'Añadir';
      this.clearMixtureForm();
    } else {
      this.mixture.push({
        mixture: this.addMixtureForm.value.mixture
      });
      this.clearMixtureForm();
    }
  }

  editMixture(index: number, mixture: string) {
    this.mixtureIndex = index;
    this.addMixtureForm.patchValue({ mixture });
    this.mixtureFormAction = 'Editar';
  }

  removeMixture(index: number) {
    this.mixture.splice(index, 1);
    this.mixtureIndex = -1;
    this.mixtureFormAction = 'Añadir';
    this.clearMixtureForm();
  }

  clearMixtureForm() {
    this.addMixtureForm.patchValue({ mixture: '' });
  }

  saveCocktail(): void {
    if (this.addCocktailForm.invalid) {
      return;
    }
    const mix = [];
    for (const i of this.mixture) {
      mix.push(i.mixture);
    }
    this.cocktail = {
      _id: null,
      name: this.addCocktailForm.value.name,
      img: this.addCocktailForm.value.img,
      ingredients: this.ingredients,
      mixture: mix
    };
    this._cocktailsService.addCocktail(this.cocktail).subscribe(() => {
      this.goBack();
    }, error => {
      console.log(error);
    });
  }

}
