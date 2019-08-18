import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { DateAdapter } from '@angular/material';
import { Meals } from 'src/app/models/meals';
import { MealsService } from 'src/app/services/meals/meals.service';

export interface MealItem {
  name: string;
}

@Component({
  selector: 'app-meals-create',
  templateUrl: './meals-create.component.html',
  styleUrls: ['./meals-create.component.scss']
})
export class MealsCreateComponent implements OnInit {
  visible = true;
  brSelectable = true;
  diSelectable = true;
  luSelectable = true;
  brRemovable = true;
  luRemovable = true;
  diRemovable = true;
  brAddOnBlur = true;
  luAddOnBlur = true;
  diAddOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  breakfastItems: MealItem[] = [];
  lunchItems: MealItem[] = [];
  dinnerItems: MealItem[] = [];
  meals: Meals;
  addMealsForm: FormGroup;

  constructor(
    private _adapter: DateAdapter<any>,
    private mealsService: MealsService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this._adapter.setLocale('es');
    this.addMealsForm = this.formBuilder.group({
      breakfast: [[], []],
      lunch: [[], []],
      dinner: [[], []],
      date: ['', [ Validators.required ]]
    });
  }

  addItem(type: string, event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      switch (type) {
        case 'breakfast':
          this.breakfastItems.push({name: value.trim()});
          break;
        case 'lunch':
          this.lunchItems.push({name: value.trim()});
          break;
        case 'dinner':
          this.dinnerItems.push({name: value.trim()});
          break;
        default:
          console.log('Pass a parameter');
          break;
      }
    }

    if (input) {
      input.value = '';
    }
  }

  removeItem(type: string, item: MealItem): void {
    switch (type) {
      case 'breakfast':
        if (this.breakfastItems.indexOf(item) >= 0) {
          this.breakfastItems.splice(this.breakfastItems.indexOf(item), 1);
        }
        break;
      case 'lunch':
        if (this.lunchItems.indexOf(item) >= 0) {
          this.lunchItems.splice(this.lunchItems.indexOf(item), 1);
        }
        break;
      case 'dinner':
        if (this.dinnerItems.indexOf(item) >= 0) {
          this.dinnerItems.splice(this.dinnerItems.indexOf(item), 1);
        }
        break;
      default:
        console.log('Pass a parameter');
        break;
    }
  }

  saveMeal() {
    const brItems: string[] = [];
    for (const breakfastItem of this.breakfastItems) {
      brItems.push(breakfastItem.name);
    }
    const luItems: string[] = [];
    for (const lunchItem of this.lunchItems) {
      luItems.push(lunchItem.name);
    }
    const diItems: string[] = [];
    for (const dinnerItem of this.dinnerItems) {
      diItems.push(dinnerItem.name);
    }
    this.meals = {
      _id: null,
      breakfast: brItems,
      lunch: luItems,
      dinner: diItems,
      date: this.addMealsForm.value.date
    };
    this.mealsService.addMeals(this.meals).subscribe(res => {
      this.goBack();
    });
  }

  goBack(): void {
    this.location.back();
  }

}
