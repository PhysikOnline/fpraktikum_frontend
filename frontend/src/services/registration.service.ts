import { EventEmitter, Injectable } from '@angular/core';
import { Institute } from '../models/institute';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import { Registration } from '../models/registration';
import { AlertService } from './alert.service';
import { ApiService } from './api.service';
import { ErrorDialogComponent } from '../app/error-dialog/error-dialog.component';
import { Partner } from '../models/partner';
import { ChosenPartner } from '../models/chosen-partner';
import { UserType } from '../models/user-type';
import { observable } from 'rxjs/symbol/observable';

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

  fullPartner: User;

  constructor(private api: ApiService,
              private alert: AlertService) {
  }

  init(): Observable<[Registration, void]> {
    return this.reload();
  }

  getUser(): Observable<void> {
    return Observable.create(observer => {
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
      }, error => this.handleError(error));
    });
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
  }

  registerUser(): Observable<void> {
    return Observable.create(observer => {
      this.api.postUser(this.user).subscribe(user => {
        this.user = user;
        this.user.status = 'registrant';
        this.registrationDoneEvent.emit();
        observer.next();
      }, error => {
        this.handleError(error, observer);
      });
    });
  }

  signOutUser(): Observable<void> {
    return Observable.create(observer => {
      this.api.signOut(this.user).subscribe(() => {
        this.reload().subscribe(() => {
          this.registrationDoneEvent.emit();
          observer.next();
        }, error => this.handleError(error, observer));
      }, error => this.handleError(error, observer));
    });
  }

  // TODO
  checkPartner(lastName: string, login: string): Observable<Partner> {
    this.partnerStatus = null;
    return Observable.create(observer => {
      this.api.checkPartner(lastName, login).subscribe(partner => {
        if (partner) {
          this.setPartnerData(partner);
        } else {
          this.partner = new Partner('', lastName, login, '', '');
          this.partnerStatus = ChosenPartner.doesNotExist;
        }
        observer.next();
      }, error => {
        if (error.status === 'registrant') {
          this.setPartnerData(User.fromApiType(error));
        } else if (error.error === 'Dieser User existiert nicht im Elearning System.') {
          this.partner = new Partner('', lastName, login, '', '');
          this.partnerStatus = ChosenPartner.doesNotExist;
        } else {
          this.handleError(error);
        }
        observer.error(error);
      });
    });
  }

  writeOnWaitinglist(): Observable<void> {
    return Observable.create(observer => {
      this.api.writeOnWaitinglist(this.user).subscribe(() => {
        this.reload().subscribe(() => {
          this.registrationDoneEvent.emit();
          observer.next();
        }, error => this.handleError(error, observer));
      }, error => this.handleError(error, observer));
    })
  }

  removeFromWaitlist(): Observable<void> {
    return Observable.create(observer => {
      this.api.removeFromWaitinglist(this.user).subscribe(() => {
        this.reload().subscribe(() => {
          this.registrationDoneEvent.emit();
          observer.next();
        }, error => this.handleError(error, observer));
      }, error => this.handleError(error, observer));
    })
  }


  savePartner() {
    this.user.partner = this.partner;
    if (this.partnerStatus === ChosenPartner.registeredAndFree) {
      this.user.institutes = this.fullPartner.institutes;
    }
  }

  deletePartner() {
    this.user.partner = null;
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
      return r.sort();
    }, []);
  }

  private handleError(message, observer?) {
    this.alert.showDialog(ErrorDialogComponent, {
      content: message,
      isBackend: true
    });
    if (observer) {
      observer.error(message);
    }
  }

  private setPartnerData(partner: User) {
    this.fullPartner = partner;
    this.partner = Partner.fromUser(partner);
    if (partner.status === UserType.notRegistered) {
      this.partnerStatus = ChosenPartner.notRegistered;
    } else if (partner.graduation !== this.user.graduation) {
      this.partnerStatus = ChosenPartner.hasDifferentGraduation;
    } else if (partner.partner) {
      this.partnerStatus = ChosenPartner.hasPartner;
    } else {
      this.partnerStatus = ChosenPartner.registeredAndFree;
    }
  }


}
