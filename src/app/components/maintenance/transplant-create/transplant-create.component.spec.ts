import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TransplantCreateComponent } from './transplant-create.component';

describe('TransplantCreateComponent', () => {
  let component: TransplantCreateComponent;
  let fixture: ComponentFixture<TransplantCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TransplantCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransplantCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
