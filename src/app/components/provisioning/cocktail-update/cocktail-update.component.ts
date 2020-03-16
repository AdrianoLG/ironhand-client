import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Cocktail } from 'src/app/models/cocktail';
import { CocktailsService } from 'src/app/services/cocktails/cocktails.service';
import { ActivatedRoute } from '@angular/router';

export interface Mixture {
  mixture: string;
}

@Component({
  selector: 'app-cocktail-update',
  templateUrl: './cocktail-update.component.html',
  styleUrls: ['./cocktail-update.component.scss']
})
export class CocktailUpdateComponent implements OnInit {
  ingredients = [];
  ingredientIndex: number;
  ingredientFormAction: string;
  addIngredientForm: FormGroup;
  mixture: Mixture[];
  mixtureIndex: number;
  mixtureFormAction: string;
  addMixtureForm: FormGroup;
  updateCocktailForm: FormGroup;
  cocktail: Cocktail;
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
    this.addIngredientForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      parts: ['', []]
    });
    this.addMixtureForm = this._formBuilder.group({
      mixture: ['', [Validators.required]]
    });
    this._cocktailsService.getCocktail(this._id).subscribe(cocktail => {
      this.cocktail = cocktail;
      this.updateCocktailForm.patchValue({
        name: cocktail.name,
        img: cocktail.img
      });
      this.ingredients = [];
      for (const ingredient of this.cocktail.ingredients) {
        this.ingredients.push({
          name: ingredient.name,
          parts: ingredient.parts
        });
      }
      this.mixture = [];
      for (const mix of this.cocktail.mixture) {
        this.mixture.push({mixture: mix});
      }
      this.ingredientIndex = -1;
      this.ingredientFormAction = 'Añadir';
      this.mixtureIndex = -1;
      this.mixtureFormAction = 'Añadir';
    });
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

  updateCocktail(): void {
    if (this.updateCocktailForm.invalid) {
      return;
    }
    const mix = [];
    for (const i of this.mixture) {
      mix.push(i.mixture);
    }
    this.cocktail = {
      _id: null,
      name: this.updateCocktailForm.value.name,
      img: this.updateCocktailForm.value.img,
      ingredients: this.ingredients,
      mixture: mix
    };
    this._cocktailsService.updateCocktail(this._id, this.cocktail).subscribe(() => {
      this.goBack();
    }, error => {
      console.log(error);
    });
  }

}
