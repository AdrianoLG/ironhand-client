import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TvSerieDetailComponent } from './tv-serie-detail.component';

describe('TvSerieDetailComponent', () => {
  let component: TvSerieDetailComponent;
  let fixture: ComponentFixture<TvSerieDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TvSerieDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvSerieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
