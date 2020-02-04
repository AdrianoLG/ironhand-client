import { TestBed } from '@angular/core/testing';

import { CleanupsService } from './cleanups.service';

describe('CleanupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CleanupsService = TestBed.get(CleanupsService);
    expect(service).toBeTruthy();
  });
});
