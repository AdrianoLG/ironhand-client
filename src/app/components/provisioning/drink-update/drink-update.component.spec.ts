import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkUpdateComponent } from './drink-update.component';

describe('DrinkUpdateComponent', () => {
  let component: DrinkUpdateComponent;
  let fixture: ComponentFixture<DrinkUpdateComponent>;

  beforeEach(async(() => {
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
