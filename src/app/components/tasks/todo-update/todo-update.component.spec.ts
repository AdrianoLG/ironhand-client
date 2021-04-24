import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TodoUpdateComponent } from './todo-update.component';

describe('TodoUpdateComponent', () => {
  let component: TodoUpdateComponent;
  let fixture: ComponentFixture<TodoUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
