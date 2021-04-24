import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RehearsalCreateComponent } from './rehearsal-create.component';

describe('RehearsalCreateComponent', () => {
  let component: RehearsalCreateComponent;
  let fixture: ComponentFixture<RehearsalCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RehearsalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RehearsalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
