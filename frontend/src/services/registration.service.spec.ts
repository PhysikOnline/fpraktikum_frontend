import { inject, TestBed } from '@angular/core/testing';

import { RegistrationService } from './registration.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Institute } from '../models/institute';
import { ApiService } from './api.service';
import { AlertService } from './alert.service';
import { MdSnackBarModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';

class ApiServiceMock {
  userMock: User;
  getUser(userAccount): Observable<User> {
    return new Observable.from([this.userMock]);
  }
}
class AlertServiceMock {

}

describe('RegistrationService', () => {
  let service: RegistrationService;
  let api: ApiServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MdSnackBarModule
      ],
      providers: [
        RegistrationService,
        { provide: ApiService, useClass: ApiServiceMock},
        { provide: AlertService, useClass: AlertServiceMock }
      ]
    });
    service = TestBed.get(RegistrationService);
    api = TestBed.get(ApiService);
  });

  afterEach(() => {
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return graduation available', () => {
    expect(RegistrationService.getGraduationAvailable([
      new Institute('IAP', 'BA', 3, 1),
      new Institute('IAP', 'MA', 3, 1),
      new Institute('IAP', 'BA', 3, 1),
      new Institute('IAP', 'BA', 3, 1),
    ])).toEqual(['BA', 'MA']);
    expect(RegistrationService.getGraduationAvailable([
      new Institute('IAP', 'BA', 3, 1),
      new Institute('IAP', 'BA', 3, 1),
    ])).toEqual(['BA']);
  });

  // it('should return user', (done) => {
  //   api.userMock = new User(null);
  //   service.getUser().subscribe(res => {
  //     expect(res).toEqual(api.userMock);
  //     done();
  //   });
  // });
});
