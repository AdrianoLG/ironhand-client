import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TaskCreateComponent } from './task-create.component';

describe('TaskCreateComponent', () => {
  let component: TaskCreateComponent;
  let fixture: ComponentFixture<TaskCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
