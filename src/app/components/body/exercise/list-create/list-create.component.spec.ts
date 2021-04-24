import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListCreateComponent } from './list-create.component';

describe('ListCreateComponent', () => {
  let component: ListCreateComponent;
  let fixture: ComponentFixture<ListCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
