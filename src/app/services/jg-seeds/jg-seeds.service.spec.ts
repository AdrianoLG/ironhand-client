import { TestBed } from '@angular/core/testing';

import { JgSeedsService } from './jg-seeds.service';

describe('JgSeedsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JgSeedsService = TestBed.get(JgSeedsService);
    expect(service).toBeTruthy();
  });
});
