import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFormMainComponent } from './registration-form-main.component';

describe('RegistrationFormMainComponent', () => {
  let component: RegistrationFormMainComponent;
  let fixture: ComponentFixture<RegistrationFormMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationFormMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
