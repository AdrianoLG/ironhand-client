import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../globals';
import { FoodProduct } from 'src/app/models/food-product';

export interface FoodProductsResponse {
  count: number;
  products: FoodProduct[]
}
@Injectable({
  providedIn: 'root'
})
export class FoodProductsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };

  constructor(
    private http: HttpClient,
    private globals: Globals
  ) { }

  getFoodProducts(): Observable<FoodProductsResponse> {
    return this.http.get<FoodProductsResponse>(this.globals.url + '/food/products', this.httpOptions);
  }

  getFoodProduct(_id: string): Observable<FoodProduct> {
    return this.http.get<FoodProduct>(this.globals.url + '/food/products/' + _id, this.httpOptions);
  }

  addFoodProduct(foodProduct: FoodProduct): any {
    return this.http.post<any>(this.globals.url + '/food/products', foodProduct, this.httpOptions);
  }

  updateFoodProducts(_id: string, foodProduct: FoodProduct): any {
    const body = [
      {
        propName: 'name',
        value: foodProduct.name
      },
      {
        propName: 'brand',
        value: foodProduct.brand
      },
      {
        propName: 'category',
        value: foodProduct.category
      },
      {
        propName: 'img',
        value: foodProduct.img
      },
      {
        propName: 'qty',
        value: foodProduct.qty
      },
      {
        propName: 'unit',
        value: foodProduct.unit
      },
      {
        propName: 'unit',
        value: foodProduct.unit
      },
      {
        propName: 'productQty',
        value: foodProduct.productQty
      },
      {
        propName: 'expiry',
        value: foodProduct.expiry
      },
      {
        propName: 'tags',
        value: foodProduct.tags
      }
    ];
    return this.http.patch<FoodProduct>(this.globals.url + '/food/products/' + _id, body, this.httpOptions);
  }

  removeFoodProducts(_id: string): any {
    return this.http.delete(this.globals.url + '/food/products/' + _id, this.httpOptions);
  }
}
