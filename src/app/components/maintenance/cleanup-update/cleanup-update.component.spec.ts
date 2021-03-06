import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CleanupUpdateComponent } from './cleanup-update.component';

describe('CleanupUpdateComponent', () => {
  let component: CleanupUpdateComponent;
  let fixture: ComponentFixture<CleanupUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanupUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanupUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
