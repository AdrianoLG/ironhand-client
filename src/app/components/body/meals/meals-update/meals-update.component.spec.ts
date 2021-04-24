import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MealsUpdateComponent } from './meals-update.component';

describe('MealsUpdateComponent', () => {
  let component: MealsUpdateComponent;
  let fixture: ComponentFixture<MealsUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MealsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
