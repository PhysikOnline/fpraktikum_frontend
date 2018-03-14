import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrantInfoComponent } from './registrant-info.component';

describe('RegistrantInfoComponent', () => {
  let component: RegistrantInfoComponent;
  let fixture: ComponentFixture<RegistrantInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrantInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrantInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
