import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeeUpdateComponent } from './recipee-update.component';

describe('RecipeeUpdateComponent', () => {
  let component: RecipeeUpdateComponent;
  let fixture: ComponentFixture<RecipeeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeeUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
