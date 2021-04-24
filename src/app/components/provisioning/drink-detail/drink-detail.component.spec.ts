import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DrinkDetailComponent } from './drink-detail.component';

describe('DrinkDetailComponent', () => {
  let component: DrinkDetailComponent;
  let fixture: ComponentFixture<DrinkDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinkDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
