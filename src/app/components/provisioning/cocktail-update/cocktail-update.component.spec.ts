import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CocktailUpdateComponent } from './cocktail-update.component';

describe('CocktailUpdateComponent', () => {
  let component: CocktailUpdateComponent;
  let fixture: ComponentFixture<CocktailUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CocktailUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CocktailUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
