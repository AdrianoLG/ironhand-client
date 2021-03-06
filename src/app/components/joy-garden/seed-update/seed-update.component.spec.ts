import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SeedUpdateComponent } from './seed-update.component';

describe('SeedUpdateComponent', () => {
  let component: SeedUpdateComponent;
  let fixture: ComponentFixture<SeedUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SeedUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
