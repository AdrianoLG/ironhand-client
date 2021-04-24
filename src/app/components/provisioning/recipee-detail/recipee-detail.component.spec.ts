import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecipeeDetailComponent } from './recipee-detail.component';

describe('RecipeeDetailComponent', () => {
  let component: RecipeeDetailComponent;
  let fixture: ComponentFixture<RecipeeDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
