import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Registration } from '../models/registration';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { User, UserApiModel } from '../models/user';
import { CONFIG } from '../config';
import { Partner } from '../models/partner';
import { AcceptDecline } from '../models/AcceptDecline';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  getRegistration(): Observable<Registration> {
    return this.http.get(`${CONFIG.API_URL}/registration/`)
      .map(Registration.fromApiType)
      .catch(this.handleError);
  }

  getUser(sNumber: string): Observable<User> {
    return this.http.get(`${CONFIG.API_URL}/user/${sNumber}`)
      .map(User.fromApiType)
      .catch(this.handleError);
  }

  postUser(user: User): Observable<User> {
    console.log(user);
    return this.http.post(`${CONFIG.API_URL}/register/`, user.toApiType())
      .map(User.fromApiType)
      .catch(this.handleError);
  }

  // TODO
  checkPartner(lastName: string, login: string): Observable<Partner> {
    return this.http.post(`${CONFIG.API_URL}/register`, {
      lastName: lastName,
      login: login,
    })
      .map(Partner.fromApiType)
      .catch(this.handleError);
  }

  acceptDecline(user: User, accept: boolean): Observable<void> {
    return this.http.post(`${CONFIG.API_URL}/accept_decline/`, AcceptDecline.fromUser(user, accept))
      .catch(this.handleError);
  }

  private handleError(error): Observable<any> {
    let message = '';

    if (error instanceof HttpErrorResponse) {
      if (error.error) {
        message = JSON.stringify(error.error);
      } else {
        message = error.message;
      }
    }

    console.error(error);
    return Observable.throw(message);
  }
}
