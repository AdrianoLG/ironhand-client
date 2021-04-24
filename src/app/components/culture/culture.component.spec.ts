import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CultureComponent } from './culture.component';

describe('CultureComponent', () => {
  let component: CultureComponent;
  let fixture: ComponentFixture<CultureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CultureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
