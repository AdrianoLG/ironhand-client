import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HouseComponent } from './house.component';

describe('HouseComponent', () => {
  let component: HouseComponent;
  let fixture: ComponentFixture<HouseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
