import { TestBed } from '@angular/core/testing';

import { CleanupService } from './cleanup.service';

describe('CleanupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CleanupService = TestBed.get(CleanupService);
    expect(service).toBeTruthy();
  });
});
