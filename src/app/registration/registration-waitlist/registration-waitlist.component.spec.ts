import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationWaitlistComponent } from './registration-waitlist.component';

describe('RegistrationWaitlistComponent', () => {
  let component: RegistrationWaitlistComponent;
  let fixture: ComponentFixture<RegistrationWaitlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationWaitlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationWaitlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
