import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Registration } from '../models/registration';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/share';
import { User, UserApiModel } from '../models/user';
import { Partner } from '../models/partner';
import { AcceptDecline } from '../models/AcceptDecline';
import { Params } from '@angular/router';
import { Http, RequestOptions } from '@angular/http';
import * as Raven from 'raven-js';
import { environment } from '../../environments/environment';
import { map, catchError, switchMap, tap, filter, take } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { LoadingService } from './loading.service';
import { Store } from '@ngrx/store';
import { GlobalUserState } from '../store/reducers/global-user.reducer';

@Injectable()
export class ApiService {
  private readonly _apiUrl = environment.API_URL;
  private readonly token = this.globalUserStore.select(
    s => s.globalUserReducer.token
  );

  constructor(
    private http: HttpClient,
    private http2: Http,
    private loadingService: LoadingService,
    private globalUserStore: Store<any>
  ) {}

  getRegistration(): Observable<Registration> {
    const req = this.getHeaders().pipe(
      switchMap(headers =>
        this.http
          .get(`${this._apiUrl}/registration/`, { headers })
          .pipe(
            map(reg => (Array.isArray(reg) && reg.length > 0 ? reg[0] : null))
          )
          .pipe(map(Registration.fromApiType), catchError(this.handleError))
      )
    );
    return this.makeRequest(req);
  }

  getUser(sNumber: string): Observable<User> {
    const req = this.getHeaders().pipe(
      switchMap(headers =>
        this.http
          .get(`${this._apiUrl}/user/${sNumber}`, { headers })
          .map(User.fromApiType)
          .catch(this.handleError)
      )
    );
    return this.makeRequest(req);
  }

  postUser(user: User): Observable<User> {
    const req = this.getHeaders().pipe(
      switchMap(headers =>
        this.http
          .post(`${this._apiUrl}/user_registrant/`, user.toApiType(), {
            headers,
          })
          .map(User.fromApiType)
          .catch(this.handleError)
      )
    );
    return this.makeRequest(req);
  }

  signOut(user: User): Observable<void> {
    const req = this.getHeaders().pipe(
      switchMap(headers =>
        this.http
          .delete(`${this._apiUrl}/user_registrant/${user.id}`, { headers })
          .catch(this.handleError)
      )
    );
    return this.makeRequest(req);
  }

  checkPartner(lastName: string, login: string): Observable<User> {
    let params = new HttpParams().set('user_lastname', lastName);
    params = params.set('user_login', login);
    const req = this.getHeaders().pipe(
      switchMap(headers =>
        this.http
          .get(`${this._apiUrl}/check_partner/`, {
            params: params,
            responseType: 'text',
            headers,
          })
          .map((res: string) => {
            if (res) {
              return User.fromApiType(JSON.parse(res));
            } else {
              return null;
            }
          })
          .catch(error => {
            if (error.status === 400) {
              return of(null);
            }
            return this.handleError(error);
          })
      )
    );
    return this.makeRequest(req);
  }

  acceptDecline(user: User, accept: boolean): Observable<void> {
    let req;
    if (accept) {
      req = this.getHeaders().pipe(
        switchMap(headers =>
          this.http.put(
            `${this._apiUrl}/user_partner/${user.id}/`,
            user.toApiType(),
            { headers }
          )
        )
      );
    } else {
      req = this.getHeaders().pipe(
        switchMap(headers =>
          this.http.delete(`${this._apiUrl}/user_partner/${user.id}/`, {
            headers,
          })
        )
      );
    }
    return this.makeRequest(req.catch(this.handleError));
  }

  writeOnWaitinglist(user: User): Observable<void> {
    const req = this.getHeaders().pipe(
      switchMap(headers =>
        this.http
          .post(`${this._apiUrl}/waitlist/`, user.toApiType(), { headers })
          .catch(this.handleError)
      )
    );
    return this.makeRequest(req);
  }

  removeFromWaitinglist(user: User): Observable<void> {
    const req = this.getHeaders().pipe(
      switchMap(headers =>
        this.http.delete(`${this._apiUrl}/waitlist/`).catch(this.handleError)
      )
    );
    return this.makeRequest(req);
  }

  setRating(stars: number, feedback: string): Observable<any> {
    const body = new FormData();
    body.append('stars', stars.toString());
    body.append('feedback', feedback);
    body.append('passphrase', 'eeec021898eec14f9c7c888c5899a81ad4dbf1ae');
    return this.http
      .post(
        `https://vm.elearning.physik.uni-frankfurt.de/po-fp-rating/api.php`,
        body,
        {
          responseType: 'text',
        }
      )
      .catch(() => Observable.throw({}));
  }

  private makeRequest(req: Observable<any>) {
    return this.loadingService.add(req.share());
  }

  private handleError(error): Observable<any> {
    let message = error;

    if (error instanceof HttpErrorResponse) {
      if (error.error) {
        message = error.error;
        message.statusText = error.statusText;
      } else {
        message = error.message;
      }
    }
    console.error('ERROR:', error);
    Raven.captureMessage(error.statusText, {
      extra: error,
    });
    return Observable.throw(message);
  }

  private getHeaders() {
    return this.token.pipe(
      take(1),
      map(token => {
        return new HttpHeaders({
          token,
        });
      })
    );
  }
}
