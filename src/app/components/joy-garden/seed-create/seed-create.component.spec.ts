import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedCreateComponent } from './seed-create.component';

describe('SeedCreateComponent', () => {
  let component: SeedCreateComponent;
  let fixture: ComponentFixture<SeedCreateComponent>;

  beforeEach(async(() => {
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
