import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlantUpdateComponent } from './plant-update.component';

describe('PlantUpdateComponent', () => {
  let component: PlantUpdateComponent;
  let fixture: ComponentFixture<PlantUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
