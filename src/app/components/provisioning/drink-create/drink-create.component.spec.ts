import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DrinkCreateComponent } from './drink-create.component';

describe('DrinkCreateComponent', () => {
  let component: DrinkCreateComponent;
  let fixture: ComponentFixture<DrinkCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinkCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
