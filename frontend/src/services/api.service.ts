import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Registration } from '../models/registration';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { User, UserApiModel } from '../models/user';
import { CONFIG } from '../config';
import { Partner } from '../models/partner';
import { AcceptDecline } from '../models/AcceptDecline';
import { Params } from '@angular/router';
import { Http, RequestOptions } from '@angular/http';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient, private http2: Http) { }

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

  signOut(user: User): Observable<void> {
    return this.http2.delete(`${CONFIG.API_URL}/register/`, {
      body: user.toApiType()
    })
      .catch(this.handleError);
  }

  // TODO
  checkPartner(lastName: string, login: string): Observable<Partner> {
    let params = new HttpParams().set('user_lastname', lastName);
    params = params.set('user_login', login);
    return this.http.get(`${CONFIG.API_URL}/check_partner/`, {
      params: params
    })
      .map(Partner.fromApiType)
      .catch(this.handleError);
  }

  acceptDecline(user: User, accept: boolean): Observable<void> {
    return this.http.post(`${CONFIG.API_URL}/accept_decline/`, AcceptDecline.fromUser(user, accept))
      .catch(this.handleError);
  }

  private handleError(error): Observable<any> {
    let message = error;

    if (error instanceof HttpErrorResponse) {
      if (error.error) {
        message = JSON.parse(error.error);
        message.statusText = error.statusText;
      } else {
        message = error.message;
      }
    }
    console.error(error);
    return Observable.throw(message);
  }
}
