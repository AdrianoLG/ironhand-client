import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MovieCreateComponent } from './movie-create.component';

describe('MovieCreateComponent', () => {
  let component: MovieCreateComponent;
  let fixture: ComponentFixture<MovieCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
