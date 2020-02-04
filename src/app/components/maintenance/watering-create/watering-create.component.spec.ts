import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WateringCreateComponent } from './watering-create.component';

describe('WateringCreateComponent', () => {
  let component: WateringCreateComponent;
  let fixture: ComponentFixture<WateringCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WateringCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WateringCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
