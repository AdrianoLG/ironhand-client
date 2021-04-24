import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CleanupCreateComponent } from './cleanup-create.component';

describe('CleanupCreateComponent', () => {
  let component: CleanupCreateComponent;
  let fixture: ComponentFixture<CleanupCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanupCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
