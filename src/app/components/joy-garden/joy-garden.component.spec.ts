import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JoyGardenComponent } from './joy-garden.component';

describe('JoyGardenComponent', () => {
  let component: JoyGardenComponent;
  let fixture: ComponentFixture<JoyGardenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JoyGardenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoyGardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
