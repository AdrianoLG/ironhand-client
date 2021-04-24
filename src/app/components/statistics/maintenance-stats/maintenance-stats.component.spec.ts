import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaintenanceStatsComponent } from './maintenance-stats.component';

describe('MaintenanceStatsComponent', () => {
  let component: MaintenanceStatsComponent;
  let fixture: ComponentFixture<MaintenanceStatsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
