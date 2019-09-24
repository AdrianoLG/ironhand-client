import { TestBed } from '@angular/core/testing';

import { JgWateringsService } from './jg-waterings.service';

describe('JgWateringsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JgWateringsService = TestBed.get(JgWateringsService);
    expect(service).toBeTruthy();
  });
});
