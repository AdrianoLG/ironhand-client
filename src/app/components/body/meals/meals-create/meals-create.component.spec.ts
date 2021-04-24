import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MealsCreateComponent } from './meals-create.component';

describe('MealsCreateComponent', () => {
  let component: MealsCreateComponent;
  let fixture: ComponentFixture<MealsCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MealsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
