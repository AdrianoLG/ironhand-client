import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowCreateComponent } from './tv-show-create.component';

describe('TvShowCreateComponent', () => {
  let component: TvShowCreateComponent;
  let fixture: ComponentFixture<TvShowCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvShowCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvShowCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
