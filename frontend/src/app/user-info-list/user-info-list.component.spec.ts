import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoListComponent } from './user-info-list.component';

describe('UserInfoListComponent', () => {
  let component: UserInfoListComponent;
  let fixture: ComponentFixture<UserInfoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
