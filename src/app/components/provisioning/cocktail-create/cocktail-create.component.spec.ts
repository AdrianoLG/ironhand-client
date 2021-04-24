import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CocktailCreateComponent } from './cocktail-create.component';

describe('CocktailCreateComponent', () => {
  let component: CocktailCreateComponent;
  let fixture: ComponentFixture<CocktailCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CocktailCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CocktailCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
