import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TvSerieCreateComponent } from './tv-serie-create.component';

describe('TvSerieCreateComponent', () => {
  let component: TvSerieCreateComponent;
  let fixture: ComponentFixture<TvSerieCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TvSerieCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvSerieCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
