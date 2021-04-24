import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FoodUpdateComponent } from './food-update.component';

describe('FoodUpdateComponent', () => {
  let component: FoodUpdateComponent;
  let fixture: ComponentFixture<FoodUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
