import { TestBed } from '@angular/core/testing';

import { RehearsalsService } from './rehearsals.service';

describe('RehearsalsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RehearsalsService = TestBed.get(RehearsalsService);
    expect(service).toBeTruthy();
  });
});
