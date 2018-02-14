import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosenPartnerInfoComponent } from './chosen-partner-info.component';

describe('ChosenPartnerInfoComponent', () => {
  let component: ChosenPartnerInfoComponent;
  let fixture: ComponentFixture<ChosenPartnerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChosenPartnerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChosenPartnerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
