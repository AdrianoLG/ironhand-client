import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowUpdateComponent } from './tv-show-update.component';

describe('TvShowUpdateComponent', () => {
  let component: TvShowUpdateComponent;
  let fixture: ComponentFixture<TvShowUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvShowUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvShowUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
