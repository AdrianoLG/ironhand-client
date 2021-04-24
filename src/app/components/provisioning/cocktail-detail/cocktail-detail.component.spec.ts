import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CocktailDetailComponent } from './cocktail-detail.component';

describe('CocktailDetailComponent', () => {
  let component: CocktailDetailComponent;
  let fixture: ComponentFixture<CocktailDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CocktailDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CocktailDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
