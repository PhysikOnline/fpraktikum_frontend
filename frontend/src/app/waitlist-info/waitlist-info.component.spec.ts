import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredInfoComponent } from './waitlist-info.component';

describe('RegisteredInfoComponent', () => {
  let component: RegisteredInfoComponent;
  let fixture: ComponentFixture<RegisteredInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
