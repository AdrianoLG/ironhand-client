import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CultureStatsComponent } from './culture-stats.component';

describe('CultureStatsComponent', () => {
  let component: CultureStatsComponent;
  let fixture: ComponentFixture<CultureStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CultureStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CultureStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
