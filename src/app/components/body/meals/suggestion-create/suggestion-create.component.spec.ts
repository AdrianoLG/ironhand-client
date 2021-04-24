import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SuggestionCreateComponent } from './suggestion-create.component';

describe('SuggestionCreateComponent', () => {
  let component: SuggestionCreateComponent;
  let fixture: ComponentFixture<SuggestionCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
