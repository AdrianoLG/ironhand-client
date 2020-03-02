import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChipItem } from 'src/app/models/chip-item';
import { Recipee } from 'src/app/models/recipee';
import { RecipeesService } from 'src/app/services/recipees/recipees.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipee-update',
  templateUrl: './recipee-update.component.html',
  styleUrls: ['./recipee-update.component.scss']
})
export class RecipeeUpdateComponent implements OnInit {
  ingredients = [];
  insSelectable = true;
  insRemovable = true;
  insAddOnBlur = true;
  instructionItems: ChipItem[] = [];
  updateRecipeeForm: FormGroup;
  recipee: Recipee;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  private _id: string;

  constructor(
    private _recipeesService: RecipeesService,
    private _location: Location,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._id = this._route.snapshot.paramMap.get('_id');
    this.updateRecipeeForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      img: ['', []]
    });
    this.ingredients = [1];
    this._recipeesService.getRecipee(this._id).subscribe(recipee => {
      this.recipee = recipee;
      this.updateRecipeeForm.patchValue({
        name: recipee.name,
        img: recipee.img
      });
      this.ingredients = recipee.ingredients;
      for (const instruction of this.recipee.instructions) {
        this.instructionItems.push({ name: instruction });
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
      this.instructionItems.push({ name: value.trim() });
    }

    if (input) {
      input.value = '';
    }
  }

  removeItem(item: ChipItem): void {
    this.instructionItems.splice(this.instructionItems.indexOf(item), 1);
  }

  addIngredient() {
    const max = this.ingredients.length;
    this.ingredients.push(max + 1);
  }

  removeIngredient() {
    this.ingredients.pop();
  }

  updateRecipee(): void {
    if (this.updateRecipeeForm.invalid) {
      return;
    }
    const instructionItems: string[] = [];
    for (const instruction of this.instructionItems) {
      instructionItems.push(instruction.name);
    }
    this.recipee = {
      _id: null,
      name: this.updateRecipeeForm.value.name,
      img: this.updateRecipeeForm.value.img,
      ingredients: this.ingredients,
      instructions: instructionItems
    };
    this._recipeesService.updateRecipee(this._id, this.recipee).subscribe(() => {
      this.goBack();
    }, error => {
      console.log(error);
    });
  }

}
