import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CompletedUpdateComponent } from './completed-update.component';

describe('CompletedUpdateComponent', () => {
  let component: CompletedUpdateComponent;
  let fixture: ComponentFixture<CompletedUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
