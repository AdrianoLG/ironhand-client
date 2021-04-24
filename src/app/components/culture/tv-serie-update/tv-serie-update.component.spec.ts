import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TvSerieUpdateComponent } from './tv-serie-update.component';

describe('TvSerieUpdateComponent', () => {
  let component: TvSerieUpdateComponent;
  let fixture: ComponentFixture<TvSerieUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TvSerieUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvSerieUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
