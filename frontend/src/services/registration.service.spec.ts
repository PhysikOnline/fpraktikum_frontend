import { inject, TestBed } from '@angular/core/testing';

import { RegistrationService } from './registration.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RegistrationService', () => {
  let service: RegistrationService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        RegistrationService,
      ]
    });
    service = TestBed.get(RegistrationService);
    backend = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    backend.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(backend).toBeTruthy();
  });

  it('should return graduation available', () => {
    expect(RegistrationService.getGraduationAvailable([
      {
        name: 'IAP',
        places: 20,
        graduation: 'BA',
        semesterHalf: 1,
      },
      {
        name: 'IAP',
        places: 20,
        graduation: 'BA',
        semesterHalf: 2,
      },
      {
        name: 'IAP',
        places: 20,
        graduation: 'MA',
        semesterHalf: 1,
      },
      {
        name: 'IAP',
        places: 20,
        graduation: 'MA',
        semesterHalf: 2,
      },
    ])).toEqual(['BA', 'MA']);
    expect(RegistrationService.getGraduationAvailable([
      {
        name: 'IAP',
        places: 20,
        graduation: 'BA',
        semesterHalf: 1,
      },
      {
        name: 'IAP',
        places: 20,
        graduation: 'BA',
        semesterHalf: 2,
      },
    ])).toEqual(['BA']);
  });
});
