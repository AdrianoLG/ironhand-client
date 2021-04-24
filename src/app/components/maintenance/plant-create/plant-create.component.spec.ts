import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlantCreateComponent } from './plant-create.component';

describe('PlantCreateComponent', () => {
  let component: PlantCreateComponent;
  let fixture: ComponentFixture<PlantCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
