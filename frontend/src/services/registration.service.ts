import { EventEmitter, Injectable } from '@angular/core';
import { Institute } from '../models/institute';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map'
import { Registration } from '../models/registration';
import { AlertService } from './alert.service';
import { ApiService } from './api.service';
import { ErrorDialogComponent } from '../app/error-dialog/error-dialog.component';
import { Partner } from '../models/partner';
import { ChosenPartner } from '../models/chosen-partner';

// we have to get the user from the document
declare let USER_FIRST_NAME: string;
declare let USER_LAST_NAME: string;
declare let USER_ACCOUNT: string;
declare let USER_EMAIL: string;
declare let USER_MATRIKEL: string;

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

  semester = '';
  date: { start: Date, end: Date };
  user: User;
  institutes: Institute[] = [];
  partner: Partner;
  graduationAvailable: string[] = [];
  partnerStatus: ChosenPartner;

  registrationDoneEvent = new EventEmitter();

  constructor(private api: ApiService,
              private alert: AlertService) {
  }

  init(): Observable<[Registration, void]> {
    return Observable.combineLatest(this.getRegistration(), this.getUser());
  }

  getUser(): Observable<void> {
    return Observable.create(observer => {
    //   this._user = new User(
    //     '',
    //     '',
    //     USER_FIRST_NAME,
    //     USER_LAST_NAME,
    //     USER_ACCOUNT,
    //     USER_EMAIL,
    //     [],
    //     new Partner("Test", "Test", "s32847", "328dskjf"),
    //   );
    //     observer.next();

      this.api.getUser(USER_ACCOUNT).subscribe((user: User) => {
        if (user.status === null) {
          this.user = new User(
            null,
            '',
            USER_FIRST_NAME,
            USER_LAST_NAME,
            USER_ACCOUNT,
            USER_EMAIL,
            USER_MATRIKEL,
            '',
            [],
            null,
          );
        } else {
          this.user = user;
        }
        observer.next();
      }, error => this.handleError(error))
    })
  }

  getRegistration(): Observable<Registration> {
    return Observable.create(observer => {
      this.api.getRegistration()
        .subscribe(res => {
          this.semester = res.semester;
          this.date = {
            start: res.startDate,
            end: res.endDate,
          };
          this.institutes = res.institutes;
          this.graduationAvailable = RegistrationService.getGraduationAvailable(this.institutes);
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
    //       i.semesterhalf
    //     );
    //   });
    //   this._graduationAvailable = RegistrationService.getGraduationAvailable(this.institutes);
    //   observer.next();
    // });
  }

  registerUser(): Observable<void> {
    return Observable.create(observer => {
      this.api.postUser(this.user).subscribe(user => {
        this.user = user;
        this.registrationDoneEvent.emit();
        observer.next();
      }, error => {
        this.handleError(error, observer);
      });
    });

    // return Observable.create(observer => {
    //   this.user.status = 'registered'
    //   this.registrationDoneEvent.emit();
    //   observer.next();
    // })
  }

  signOutUser(): Observable<void> {
    return Observable.create(observer => {
      this.api.signOut(this.user).subscribe(() => {
        this.reload().subscribe(() => {
          this.registrationDoneEvent.emit();
          observer.next();
        }, error => this.handleError(error, observer));
      }, error => this.handleError(error, observer))
    });
    // return Observable.create(observer => {
    //   this.registrationDoneEvent.emit();
    //   this.user.status = null;
    //   observer.next();
    // })
  }

  // TODO
  checkPartner(lastName: string, login: string): Observable<Partner> {
    this.partnerStatus = null;
    return Observable.create(observer => {
      // setTimeout(() => {
      //   this.partner = new Partner(
      //     'Test',
      //     lastName,
      //     login,
      //     '',
      //   );
      //
      //   this.user.partner = this.partner;
      //   this.partnerStatus = ChosenPartner.doesNotExist;
      //   observer.next(this.partner);
      // }, 500)
      this.api.checkPartner(lastName, login).subscribe(res => {
        console.log(res);
        this.partnerStatus = ChosenPartner.registeredAndFree;
        this.user.institutes = [this.institutes[0]];
        observer.next();
      }, error => {
        this.handleError(error)
      })
    });
  }

  private reload(): Observable<[Registration, void]> {
    return Observable.combineLatest(this.getRegistration(), this.getUser());
  }

  acceptDecline(accept: boolean): Observable<void> {
    return this.api.acceptDecline(this.user, accept);
  }

  static getGraduationAvailable(institutes: Institute[]): string[] {
    return institutes.reduce((r, i) => {
      if (r.indexOf(i.graduation) === -1) {
        r.push(i.graduation);
      }
      return r;
    }, []);
  }

  private handleError(message, observer?) {
    this.alert.showDialog(ErrorDialogComponent, {
      content: message,
      isBackend: true
    });
    observer.error(message);
  }
}
