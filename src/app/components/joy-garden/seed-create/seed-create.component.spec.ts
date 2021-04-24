import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SeedCreateComponent } from './seed-create.component';

describe('SeedCreateComponent', () => {
  let component: SeedCreateComponent;
  let fixture: ComponentFixture<SeedCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SeedCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
