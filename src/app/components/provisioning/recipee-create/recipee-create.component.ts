import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChipItem } from 'src/app/models/chip-item';
import { Recipee } from 'src/app/models/recipee';
import { RecipeesService } from 'src/app/services/recipees/recipees.service';

@Component({
  selector: 'app-recipee-create',
  templateUrl: './recipee-create.component.html',
  styleUrls: ['./recipee-create.component.scss']
})
export class RecipeeCreateComponent implements OnInit {
  ingredients = [];
  insSelectable = true;
  insRemovable = true;
  insAddOnBlur = true;
  instructionItems: ChipItem[] = [];
  addRecipeeForm: FormGroup;
  recipee: Recipee;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private _recipeesService: RecipeesService,
    private _location: Location,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.addRecipeeForm = this._formBuilder.group({
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

  saveRecipee(): void {
    if (this.addRecipeeForm.invalid) {
      return;
    }
    const instructionItems: string[] = [];
    for (const instruction of this.instructionItems) {
      instructionItems.push(instruction.name);
    }
    this.recipee = {
      _id: null,
      name: this.addRecipeeForm.value.name,
      img: this.addRecipeeForm.value.img,
      ingredients: this.ingredients,
      instructions: instructionItems
    };
    this._recipeesService.addRecipee(this.recipee).subscribe(() => {
      this.goBack();
    }, error => {
      console.log(error);
    });
  }

}
