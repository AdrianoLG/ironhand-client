import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Recipee } from 'src/app/models/recipee';
import { RecipeesService } from 'src/app/services/recipees/recipees.service';
import { Ingredient } from 'src/app/models/ingredient';
import { ActivatedRoute } from '@angular/router';

export interface Instruction {
  instruction: string;
}

@Component({
  selector: 'app-recipee-update',
  templateUrl: './recipee-update.component.html',
  styleUrls: ['./recipee-update.component.scss']
})
export class RecipeeUpdateComponent implements OnInit {
  ingredients: Ingredient[];
  ingredientIndex: number;
  ingredientFormAction: string;
  addIngredientForm: FormGroup;
  instructions: Instruction[];
  instructionIndex: number;
  instructionFormAction: string;
  addInstructionForm: FormGroup;
  updateRecipeeForm: FormGroup;
  recipee: Recipee;
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
    this._recipeesService.getRecipee(this._id).subscribe(recipee => {
      this.recipee = recipee;
      this.updateRecipeeForm.patchValue({
        name: recipee.name,
        img: recipee.img
      });
      this.ingredients = [];
      for (const ingredient of this.recipee.ingredients) {
        this.ingredients.push({
          name: ingredient.name,
          qty: ingredient.qty,
          unit: ingredient.unit
        });
      }
      this.instructions = [];
      for (const instruction of this.recipee.instructions) {
        this.instructions.push({instruction});
      }
      this.addIngredientForm = this._formBuilder.group({
        name: ['', [Validators.required]],
        qty: [, []],
        unit: ['', []]
      });
      this.addInstructionForm = this._formBuilder.group({
        instruction: ['', [Validators.required]]
      });
      this.ingredientIndex = -1;
      this.ingredientFormAction = 'Añadir';
      this.instructionIndex = -1;
      this.instructionFormAction = 'Añadir';
    });
  }

  goBack(): void {
    this._location.back();
  }

  addIngredient(newIngredient?: number) {
    if (newIngredient !== -1) {
      this.ingredients[this.ingredientIndex].name = this.addIngredientForm.value.name;
      this.ingredients[this.ingredientIndex].qty = this.addIngredientForm.value.qty;
      this.ingredients[this.ingredientIndex].unit = this.addIngredientForm.value.unit;
      this.ingredientIndex = -1;
      this.ingredientFormAction = 'Añadir';
      this.clearIngredientForm();
    } else {
      this.ingredients.push({
        name: this.addIngredientForm.value.name,
        qty: this.addIngredientForm.value.qty,
        unit: this.addIngredientForm.value.unit
      });
      this.clearIngredientForm();
    }
  }

  editIngredient(index: number, name: string, qty: number, unit: string) {
    this.ingredientIndex = index;
    this.addIngredientForm.patchValue({
      name,
      qty,
      unit
    });
    this.ingredientFormAction = 'Editar';
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.clearIngredientForm();
  }

  clearIngredientForm() {
    this.addIngredientForm.patchValue({ name: '', qty: '', unit: ''});
  }

  addInstruction(newInstruction?: number) {
    if (newInstruction !== -1) {
      this.instructions[this.instructionIndex].instruction = this.addInstructionForm.value.instruction;
      this.instructionIndex = -1;
      this.instructionFormAction = 'Añadir';
      this.clearInstructionForm();
    } else {
      this.instructions.push({
        instruction: this.addInstructionForm.value.instruction
      });
      this.clearInstructionForm();
    }
  }

  editInstruction(index: number, instruction: string) {
    this.instructionIndex = index;
    this.addInstructionForm.patchValue({ instruction });
    this.instructionFormAction = 'Editar';
  }

  removeInstruction(index: number) {
    this.instructions.splice(index, 1);
    this.instructionIndex = -1;
    this.instructionFormAction = 'Añadir';
    this.clearInstructionForm();
  }

  clearInstructionForm() {
    this.addInstructionForm.patchValue({ instruction: '' });
  }

  updateRecipee(): void {
    if (this.updateRecipeeForm.invalid) {
      return;
    }
    const inst = [];
    for (const i of this.instructions) {
      inst.push(i.instruction);
    }
    this.recipee = {
      _id: null,
      name: this.updateRecipeeForm.value.name,
      img: this.updateRecipeeForm.value.img,
      ingredients: this.ingredients,
      instructions: inst
    };
    this._recipeesService.updateRecipee(this._id, this.recipee).subscribe(() => {
      this.goBack();
    }, error => {
      console.log(error);
    });
  }

}
