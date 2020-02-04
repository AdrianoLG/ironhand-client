import { TestBed } from '@angular/core/testing';

import { RecipeesService } from './recipees.service';

describe('RecipeesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipeesService = TestBed.get(RecipeesService);
    expect(service).toBeTruthy();
  });
});
