import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransplantCreateComponent } from './transplant-create.component';

describe('TransplantCreateComponent', () => {
  let component: TransplantCreateComponent;
  let fixture: ComponentFixture<TransplantCreateComponent>;

  beforeEach(async(() => {
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
