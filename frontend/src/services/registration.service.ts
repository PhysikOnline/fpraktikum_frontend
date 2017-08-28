import { EventEmitter, Injectable } from '@angular/core';
import { InstituteInterface } from '../app/interfaces/institute.interface';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../app/interfaces/user.interface';

import 'rxjs/add/observable/combineLatest';

// we have to get the user from the document
declare let USER_FIRST_NAME: string;
declare let USER_LAST_NAME: string;
declare let USER_ACCOUNT: string;
declare let USER_EMAIL: string;

export const REG = {
  semester: 'WS17',
  start_date: '2017-08-06T00:00:00Z',
  end_date: '2017-08-30T00:00:00Z',
  institutes: [
    {
      name: 'IAP',
      places: 20,
      graduation: 'BA',
      semester_half: 1,
    },
    {
      name: 'IAP',
      places: 20,
      graduation: 'BA',
      semester_half: 2,
    },
    {
      name: 'PI',
      places: 25,
      graduation: 'BA',
      semester_half: 1,
    },
    {
      name: 'PI',
      places: 10,
      graduation: 'BA',
      semester_half: 2,
    },
    {
      name: 'IAP',
      places: 20,
      graduation: 'MA',
      semester_half: 1,
    },
    {
      name: 'IAP',
      places: 20,
      graduation: 'MA',
      semester_half: 2,
    },
    {
      name: 'ITP',
      places: 25,
      graduation: 'MA',
      semester_half: 1,
    },
    {
      name: 'ITP',
      places: 10,
      graduation: 'MA',
      semester_half: 2,
    },
    {
      name: 'IAP',
      places: 25,
      graduation: 'LA',
      semester_half: 1,
    },
    {
      name: 'PI',
      places: 10,
      graduation: 'LA',
      semester_half: 2,
    },
  ]
};

@Injectable()
export class RegistrationService {

  private _semester = '';
  private _date: { start: string, end: string };
  private _user: UserInterface;
  private _institutes: InstituteInterface[] = [];
  private _partner: { name: string, sNumber: string };
  private _graduationAvailable: string[] = [];

  registrationDoneEvent = new EventEmitter();

  constructor(private http: HttpClient) {
  }

  init(): Observable<[void, void]> {
    return Observable.combineLatest(this.getRegistration(), this.getUser());
  }

  getUser(): Observable<void> {
    return Observable.create(observer => {
      this._user = {
        firstName: USER_FIRST_NAME,
        lastName: USER_LAST_NAME,
        sNumber: USER_ACCOUNT,
        email: USER_EMAIL,
        graduation: null,
        institutes: [],
        partner: null,
        status: null
      };
      observer.next();
    })
  }

  getRegistration(): Observable<void> {
    return Observable.create(observer => {
      this._semester = REG.semester;
      this._date = {
        start: REG.start_date,
        end: REG.end_date
      };
      this._institutes = REG.institutes.map(i => {
        return {
          name: i.name,
          places: i.places,
          graduation: i.graduation,
          semesterHalf: i.semester_half
        };
      });
      this._graduationAvailable = RegistrationService.getGraduationAvailable(this.institutes);
      observer.next();
    });
  }

  registerUser(): Observable<void> {
    return Observable.create(observer => {
      this.registrationDoneEvent.emit();
      observer.next();
    })
  }

  get semester(): string {
    return this._semester;
  }

  get date(): { start: string; end: string } {
    return this._date;
  }

  get user(): UserInterface {
    return this._user;
  }

  get institutes(): InstituteInterface[] {
    return this._institutes;
  }

  get partner(): { name: string; sNumber: string } {
    return this._partner;
  }

  get graduationAvailable(): string[] {
    return this._graduationAvailable;
  }

  static getGraduationAvailable(institutes: InstituteInterface[]): string[] {
    return institutes.reduce((r, i) => {
      if (r.indexOf(i.graduation) === -1) {
        r.push(i.graduation);
      }
      return r;
    }, []);
  }
}
