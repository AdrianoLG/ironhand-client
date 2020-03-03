import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RehearsalUpdateComponent } from './rehearsal-update.component';

describe('RehearsalUpdateComponent', () => {
  let component: RehearsalUpdateComponent;
  let fixture: ComponentFixture<RehearsalUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RehearsalUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RehearsalUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
