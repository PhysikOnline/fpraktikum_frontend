import { TestBed } from '@angular/core/testing';

import { TranslateService } from './translate.service';

describe('TranslateService', () => {
  let service: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslateService]
    });
    service = TestBed.get(TranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should switch language', () => {
    service.language = 'en';
    expect(service.language).toBe('en');
  })

  it('should return the correct text', () => {
    service.text = {
      de: {
        TEST: 'Test'
      }
    };

    expect(service.translate('TEST')).toBe('Test');
    expect(service.translate('TEST_NOT_THERE')).toBe('UNKNOWN');
  })
});
