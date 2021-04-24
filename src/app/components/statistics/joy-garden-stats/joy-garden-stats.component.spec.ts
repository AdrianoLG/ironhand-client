import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JoyGardenStatsComponent } from './joy-garden-stats.component';

describe('JoyGardenStatsComponent', () => {
  let component: JoyGardenStatsComponent;
  let fixture: ComponentFixture<JoyGardenStatsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JoyGardenStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoyGardenStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
