import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProvisioningComponent } from './provisioning.component';

describe('ProvisioningComponent', () => {
  let component: ProvisioningComponent;
  let fixture: ComponentFixture<ProvisioningComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvisioningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisioningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
