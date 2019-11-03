import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionUpdateComponent } from './suggestion-update.component';

describe('SuggestionUpdateComponent', () => {
  let component: SuggestionUpdateComponent;
  let fixture: ComponentFixture<SuggestionUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
