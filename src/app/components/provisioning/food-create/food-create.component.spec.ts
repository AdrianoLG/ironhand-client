import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FoodCreateComponent } from './food-create.component';

describe('FoodCreateComponent', () => {
  let component: FoodCreateComponent;
  let fixture: ComponentFixture<FoodCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
