import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MovieUpdateComponent } from './movie-update.component';

describe('MovieUpdateComponent', () => {
  let component: MovieUpdateComponent;
  let fixture: ComponentFixture<MovieUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
