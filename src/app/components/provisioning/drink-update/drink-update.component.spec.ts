import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DrinkUpdateComponent } from './drink-update.component';

describe('DrinkUpdateComponent', () => {
  let component: DrinkUpdateComponent;
  let fixture: ComponentFixture<DrinkUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinkUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
