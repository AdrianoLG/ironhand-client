import { TestBed } from '@angular/core/testing';

import { VisibleBarService } from './visible-bar.service';

describe('VisibleBarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VisibleBarService = TestBed.get(VisibleBarService);
    expect(service).toBeTruthy();
  });
});
