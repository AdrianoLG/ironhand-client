import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ChipItem } from 'src/app/models/chip-item';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FoodProduct } from 'src/app/models/food-product';
import { FoodProductsService } from 'src/app/services/food-products/food-products.service';


@Component({
  selector: 'app-food-create',
  templateUrl: './food-create.component.html',
  styleUrls: ['./food-create.component.scss']
})
export class FoodCreateComponent implements OnInit {
  tagSelectable = true;
  tagRemovable = true;
  tagAddOnBlur = true;
  tags: ChipItem[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  food: FoodProduct;
  addFoodForm: FormGroup;


  constructor(
    private _foodService: FoodProductsService,
    private _location: Location,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.addFoodForm = this._formBuilder.group({
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

  onSubmit() {
    const tags: string[] = [];
    for (const tag of this.tags) {
      tags.push(tag.name);
    }
    this.food = {
      _id: null,
      name: this.addFoodForm.value.name,
      brand: this.addFoodForm.value.brand,
      category: this.addFoodForm.value.category,
      img: this.addFoodForm.value.img,
      qty: this.addFoodForm.value.qty,
      unit: this.addFoodForm.value.unit,
      productQty: this.addFoodForm.value.productQty,
      expiry: this.addFoodForm.value.expiry,
      tags: tags
    };
    this._foodService.addFoodProduct(this.food).subscribe(res => {
      this.goBack();
    });
  }

  goBack(): void {
    this._location.back();
  }

}
