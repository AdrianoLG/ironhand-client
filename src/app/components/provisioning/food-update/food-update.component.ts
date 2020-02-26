import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { FoodProduct } from 'src/app/models/food-product';
import { ChipItem } from 'src/app/models/chip-item';
import { FoodProductsService } from 'src/app/services/food-products/food-products.service';

@Component({
  selector: 'app-food-update',
  templateUrl: './food-update.component.html',
  styleUrls: ['./food-update.component.scss']
})
export class FoodUpdateComponent implements OnInit {
  tagSelectable = true;
  tagRemovable = true;
  tagAddOnBlur = true;
  tags: ChipItem[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  food: FoodProduct;
  updateFoodForm: FormGroup;
  private _id: string;

  constructor(
    private _foodService: FoodProductsService,
    private _location: Location,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._id = this._route.snapshot.paramMap.get('_id');
    this._foodService.getFoodProduct(this._id)
      .subscribe(food => {
        this.food = food;
        for (const tag of this.food.tags) {
          this.tags.push({ name: tag });
        }
        this.updateFoodForm = this._formBuilder.group({
          name: ['', [Validators.required]],
          brand: ['', []],
          category: ['', [Validators.required]],
          img: ['', []],
          qty: [, [Validators.required]],
          unit: [, [Validators.required]],
          productQty: [, []],
          expiry: ['', []],
          tags: [[], []]
        });
        this.updateFoodForm.patchValue({
          name: food.name,
          brand: food.brand,
          category: food.category,
          img: food.img,
          qty: food.qty,
          unit: food.unit,
          productQty: food.productQty,
          expiry: food.expiry,
          tags: food.tags
        });
      });
  }

  addItem(type: string, event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push({ name: value.trim() });
    }

    if (input) {
      input.value = '';
    }
  }

  removeItem(type: string, item: ChipItem): void {
    if (this.tags.indexOf(item) >= 0) {
      this.tags.splice(this.tags.indexOf(item), 1);
    }
  }

  updateFood() {
    const tags: string[] = [];
    for (const tag of this.tags) {
      tags.push(tag.name);
    }
    this.food = {
      _id: null,
      name: this.updateFoodForm.value.name,
      brand: this.updateFoodForm.value.brand,
      category: this.updateFoodForm.value.category,
      img: this.updateFoodForm.value.img,
      qty: this.updateFoodForm.value.qty,
      unit: this.updateFoodForm.value.unit,
      productQty: this.updateFoodForm.value.productQty,
      expiry: this.updateFoodForm.value.expiry,
      tags: tags
    };
    this._foodService.updateFoodProducts(this._id, this.food)
      .subscribe(() => {
        this.goBack();
      }, error => {
        console.log(error);
      });
  }

  goBack(): void {
    this._location.back();
  }

}
