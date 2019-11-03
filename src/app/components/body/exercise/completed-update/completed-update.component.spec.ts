import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedUpdateComponent } from './completed-update.component';

describe('CompletedUpdateComponent', () => {
  let component: CompletedUpdateComponent;
  let fixture: ComponentFixture<CompletedUpdateComponent>;

  beforeEach(async(() => {
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
