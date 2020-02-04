import { TestBed } from '@angular/core/testing';

import { FoodProductsService } from './food-products.service';

describe('FoodProductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoodProductsService = TestBed.get(FoodProductsService);
    expect(service).toBeTruthy();
  });
});
