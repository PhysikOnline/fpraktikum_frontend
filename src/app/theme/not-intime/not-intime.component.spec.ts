import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotIntimeComponent } from './not-intime.component';

describe('NotIntimeComponent', () => {
  let component: NotIntimeComponent;
  let fixture: ComponentFixture<NotIntimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotIntimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotIntimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
