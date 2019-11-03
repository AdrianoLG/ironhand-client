import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedCreateComponent } from './completed-create.component';

describe('CompletedCreateComponent', () => {
  let component: CompletedCreateComponent;
  let fixture: ComponentFixture<CompletedCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
