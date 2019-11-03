import { TestBed } from '@angular/core/testing';

import { TvSeriesService } from './tv-series.service';

describe('TvSeriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TvSeriesService = TestBed.get(TvSeriesService);
    expect(service).toBeTruthy();
  });
});
