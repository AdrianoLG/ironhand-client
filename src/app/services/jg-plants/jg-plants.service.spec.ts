import { TestBed } from '@angular/core/testing';

import { JgPlantsService } from './jg-plants.service';

describe('JgPlantsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JgPlantsService = TestBed.get(JgPlantsService);
    expect(service).toBeTruthy();
  });
});
