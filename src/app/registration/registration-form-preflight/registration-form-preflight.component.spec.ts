import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFormPreflightComponent } from './registration-form-preflight.component';

describe('RegistrationFormPreflightComponent', () => {
  let component: RegistrationFormPreflightComponent;
  let fixture: ComponentFixture<RegistrationFormPreflightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationFormPreflightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormPreflightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
