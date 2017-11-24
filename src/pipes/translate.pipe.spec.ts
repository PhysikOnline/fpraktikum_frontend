import { TranslatePipe } from './translate.pipe';
import { TestBed } from '@angular/core/testing';
import { TranslateService } from '../services/translate.service';

const TEST = {
  TEST1: 'Test',
  TEST2: '',
  TEST3: 'Test %0% %1%',
  TEST4: 'Test %2% %1%',
};

class TestTranslateService {
  translate(name: string) {
    return TEST[name];
  }
}

describe('TranslatePipe', () => {
  let pipe: TranslatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TranslatePipe,
        {provide: TranslateService, useClass: TestTranslateService}
      ]
    });
    pipe = TestBed.get(TranslatePipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('returns the correct text', () => {
    expect(pipe.transform('TEST1')).toBe(TEST['TEST1']);
    expect(pipe.transform('TEST2')).toBe(TEST['TEST2']);
    expect(pipe.transform('TEST3', 'abc', 'def')).toBe('Test abc def');
    expect(pipe.transform('TEST4', 'abc', 'def')).toBe('Test %2% def');
  });
});
