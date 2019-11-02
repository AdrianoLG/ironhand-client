import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantUpdateComponent } from './plant-update.component';

describe('PlantUpdateComponent', () => {
  let component: PlantUpdateComponent;
  let fixture: ComponentFixture<PlantUpdateComponent>;

  beforeEach(async(() => {
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
