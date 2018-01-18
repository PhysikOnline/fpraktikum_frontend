import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

  constructor() { }

  static now() {
    return Date.now();
  }
}
