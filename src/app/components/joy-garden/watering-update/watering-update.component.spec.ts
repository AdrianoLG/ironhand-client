import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WateringUpdateComponent } from './watering-update.component';

describe('WateringUpdateComponent', () => {
  let component: WateringUpdateComponent;
  let fixture: ComponentFixture<WateringUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WateringUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WateringUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
