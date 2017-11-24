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
import * as Raven from 'raven-js';
import { RegistrationService } from './registration.service';
import {environment} from "../environments/environment";

@Injectable()
export class ApiService {
  private readonly _apiUrl = environment.API_URL;

  constructor(private http: HttpClient, private http2: Http) { }

  getRegistration(): Observable<Registration> {
    return this.http.get(`${this._apiUrl}/registration/`)
      .map(Registration.fromApiType)
      .catch(this.handleError);
  }

  getUser(sNumber: string): Observable<User> {
    return this.http.get(`${this._apiUrl}/user/${sNumber}`)
      .map(User.fromApiType)
      .catch(this.handleError);
  }

  postUser(user: User): Observable<User> {
    console.log(user);
    return this.http.post(`${this._apiUrl}/register/`, user.toApiType())
      .map(User.fromApiType)
      .catch(this.handleError);
  }

  signOut(user: User): Observable<void> {
    return this.http2.delete(`${this._apiUrl}/register/`, {
      body: user.toApiType()
    })
      .catch(this.handleError);
  }

  checkPartner(lastName: string, login: string): Observable<User> {
    let params = new HttpParams().set('user_lastname', lastName);
    params = params.set('user_login', login);
    return this.http.get(`${this._apiUrl}/check_partner/`, {
      params: params,
      responseType: 'text',
    })
      .map((res: string) => {
        if (res) {
          return User.fromApiType(JSON.parse(res));
        } else {
          return null;
        }
      })
      .catch(this.handleError);
  }

  acceptDecline(user: User, accept: boolean): Observable<void> {
    return this.http.post(`${this._apiUrl}/accept/`, AcceptDecline.fromUser(user, accept).toApiType(), {
      responseType: 'text',
    }).map((res: string) => {
      if (res) {
        return User.fromApiType(JSON.parse(res));
      } else {
        return null;
      }
    })
      .catch(this.handleError);
  }

  writeOnWaitinglist(user: User): Observable<void> {
    return this.http.post(`${this._apiUrl}/waitlist/`, user.toApiType())
      .catch(this.handleError);
  }

  removeFromWaitinglist(user: User): Observable<void> {
    return this.http2.delete(`${this._apiUrl}/waitlist/`, {
      body: user.toApiType()
    })
      .catch(this.handleError);
  }

  setRating(stars: number, feedback: string): Observable<any> {
    const body = new FormData();
    body.append('stars', stars.toString());
    body.append('feedback', feedback);
    body.append('passphrase', 'eeec021898eec14f9c7c888c5899a81ad4dbf1ae');
    return this.http.post(`https://vm.elearning.physik.uni-frankfurt.de/po-fp-rating/api.php`, body, { responseType: 'text' })
      .catch(() => Observable.throw({}));
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
    Raven.captureMessage(error.statusText, {
      extra: error
    });
    return Observable.throw(message);
  }
}
