import { Component, OnInit } from '@angular/core';
import { FoodProductsService } from 'src/app/services/food-products/food-products.service';
import { FoodProduct } from 'src/app/models/food-product';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss']
})
export class FoodDetailComponent implements OnInit {
  food: FoodProduct;
  private _id: string;

  constructor(
    private _foodService: FoodProductsService,
    private _route: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit() {
    this._id = this._route.snapshot.paramMap.get('_id');
    this._foodService.getFoodProduct(this._id)
      .subscribe(food => {
        this.food = food;
      });
  }

}
