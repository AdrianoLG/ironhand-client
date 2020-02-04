import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeeCreateComponent } from './recipee-create.component';

describe('RecipeeCreateComponent', () => {
  let component: RecipeeCreateComponent;
  let fixture: ComponentFixture<RecipeeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
