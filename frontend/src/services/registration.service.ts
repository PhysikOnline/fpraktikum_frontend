import { EventEmitter, Injectable } from '@angular/core';
import { Institute } from '../models/institute';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map'
import { Registration } from '../models/registration';
import { AlertService } from './alert.service';
import { ApiService } from './api.service';
import { ErrorDialogComponent } from '../app/error-dialog/error-dialog.component';

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
  private _user: User;
  private _institutes: Institute[] = [];
  private _partner: { name: string, sNumber: string };
  private _graduationAvailable: string[] = [];

  registrationDoneEvent = new EventEmitter();

  constructor(private api: ApiService,
              private alert: AlertService) {
  }

  init(): Observable<[Registration, void]> {
    return Observable.combineLatest(this.getRegistration(), this.getUser());
  }

  getUser(): Observable<void> {
    return Observable.create(observer => {
      this.api.getUser(USER_ACCOUNT).subscribe(user => {
        if (user.status === null) {
          this._user = new User(
            null,
            USER_FIRST_NAME,
            USER_LAST_NAME,
            USER_ACCOUNT,
            USER_EMAIL,
            'BA',
            [],
            null,
          );
        } else {
          this._user = user;
        }
        observer.next();
      }, error => this.handleError(error))
    })
  }

  getRegistration(): Observable<Registration> {
    return Observable.create(observer => {
      this.api.getRegistration()
        .subscribe(res => {
          this._semester = res.semester;
          observer.next(res);
        }, error => this.handleError(error));
    });

    // return Observable.create(observer => {
    //   this._semester = REG.semester;
    //   this._date = {
    //     start: REG.start_date,
    //     end: REG.end_date
    //   };
    //   this._institutes = REG.institutes.map(i => {
    //     return new Institute(
    //       i.name,
    //       i.graduation,
    //       i.places,
    //       i.semester_half
    //     );
    //   });
    //   this._graduationAvailable = RegistrationService.getGraduationAvailable(this.institutes);
    //   observer.next();
    // });
  }

  registerUser(): Observable<void> {
    return Observable.create(observer => {
      this.user.status = 'registered'
      this.registrationDoneEvent.emit();
      observer.next();
    })
  }

  signOutUser(): Observable<void> {
    return Observable.create(observer => {
      this.registrationDoneEvent.emit();
      this.user.status = null;
      observer.next();
    })
  }

  get semester(): string {
    return this._semester;
  }

  get date(): { start: string; end: string } {
    return this._date;
  }

  get user(): User {
    return this._user;
  }

  get institutes(): Institute[] {
    return this._institutes;
  }

  get partner(): { name: string; sNumber: string } {
    return this._partner;
  }

  get graduationAvailable(): string[] {
    return this._graduationAvailable;
  }

  static getGraduationAvailable(institutes: Institute[]): string[] {
    return institutes.reduce((r, i) => {
      if (r.indexOf(i.graduation) === -1) {
        r.push(i.graduation);
      }
      return r;
    }, []);
  }

  private handleError(message) {
    this.alert.showDialog(ErrorDialogComponent, {
      content: message,
      isBackend: true
    });
  }
}
