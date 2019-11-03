import { TestBed } from '@angular/core/testing';

import { CompletedExercisesService } from './completed-exercises.service';

describe('CompletedExerciseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompletedExercisesService = TestBed.get(CompletedExercisesService);
    expect(service).toBeTruthy();
  });
});
