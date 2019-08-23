import { TestBed } from '@angular/core/testing';

import { SelectedTabService } from './selected-tab.service';

describe('SelectedTabService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectedTabService = TestBed.get(SelectedTabService);
    expect(service).toBeTruthy();
  });
});
