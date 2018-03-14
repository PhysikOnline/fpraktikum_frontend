import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationEndComponent } from './registration-end.component';

describe('RegistrationEndComponent', () => {
  let component: RegistrationEndComponent;
  let fixture: ComponentFixture<RegistrationEndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationEndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
