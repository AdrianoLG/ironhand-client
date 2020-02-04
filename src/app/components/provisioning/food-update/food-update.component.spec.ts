import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodUpdateComponent } from './food-update.component';

describe('FoodUpdateComponent', () => {
  let component: FoodUpdateComponent;
  let fixture: ComponentFixture<FoodUpdateComponent>;

  beforeEach(async(() => {
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
