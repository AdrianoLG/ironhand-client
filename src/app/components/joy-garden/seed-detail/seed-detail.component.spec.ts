import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SeedDetailComponent } from './seed-detail.component';

describe('SeedDetailComponent', () => {
  let component: SeedDetailComponent;
  let fixture: ComponentFixture<SeedDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SeedDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
