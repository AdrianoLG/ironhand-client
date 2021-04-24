import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RehearsalStatsComponent } from './rehearsal-stats.component';

describe('RehearsalStatsComponent', () => {
  let component: RehearsalStatsComponent;
  let fixture: ComponentFixture<RehearsalStatsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RehearsalStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RehearsalStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
