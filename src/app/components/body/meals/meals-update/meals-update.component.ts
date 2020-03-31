import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Meals } from 'src/app/models/meals';
import { MealsService } from 'src/app/services/meals/meals.service';
import { ActivatedRoute } from '@angular/router';
import { ChipItem } from 'src/app/models/chip-item';

@Component({
  selector: 'app-meals-update',
  templateUrl: './meals-update.component.html',
  styleUrls: ['./meals-update.component.scss']
})
export class MealsUpdateComponent implements OnInit {

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
  breakfastItems: ChipItem[] = [];
  lunchItems: ChipItem[] = [];
  dinnerItems: ChipItem[] = [];
  meals: Meals;
  updateMealsForm: FormGroup;
  public _id: string;

  constructor(
    private _mealsService: MealsService,
    private _location: Location,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._id = this._route.snapshot.paramMap.get('_id');
    this._mealsService.getMeal(this._id).subscribe(meals => {
      this.meals = meals;
      for (const meal of this.meals.breakfast) {
        this.breakfastItems.push({ name: meal });
      }
      for (const meal of this.meals.lunch) {
        this.lunchItems.push({ name: meal });
      }
      for (const meal of this.meals.dinner) {
        this.dinnerItems.push({ name: meal });
      }
      this.updateMealsForm.patchValue({ date: meals.date });
    });
    this.updateMealsForm = this._formBuilder.group({
      breakfast: [this.breakfastItems, []],
      lunch: [this.lunchItems, []],
      dinner: [this.dinnerItems, []],
      date: ['', [Validators.required]]
    });
  }

  addItem(type: string, event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      switch (type) {
        case 'breakfast':
          this.breakfastItems.push({ name: value.trim() });
          break;
        case 'lunch':
          this.lunchItems.push({ name: value.trim() });
          break;
        case 'dinner':
          this.dinnerItems.push({ name: value.trim() });
          break;
        default:
          console.log('No more cases. Check the code');
          break;
      }
    }

    if (input) {
      input.value = '';
    }
  }

  removeItem(type: string, item: ChipItem): void {
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
        console.log('No more cases. Check the code');
        break;
    }
  }

  updateMeal() {
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
      _id: this._id,
      breakfast: brItems,
      lunch: luItems,
      dinner: diItems,
      date: this.updateMealsForm.value.date
    };
    this._mealsService.updateMeals(this.meals._id, this.meals).subscribe(response => {
      this.goBack();
    }, error => {
      console.log(error);
    });
  }

  deleteMeal(): void {
    this._mealsService.removeMeals(this._id).subscribe(response => {
      this.goBack();
    }, error => {
      console.log(error);
    });
  }

  goBack(): void {
    this._location.back();
  }

}
