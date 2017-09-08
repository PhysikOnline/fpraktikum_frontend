import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Registration } from '../models/registration';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { User } from '../models/user';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  getRegistration(): Observable<Registration> {
    return this.http.get('https://po-fp.physikelearning.de/api/registration/')
      .map(Registration.fromApiType)
      .catch(this.handleError);
  }

  getUser(sNumber: string): Observable<User> {
    return this.http.get(`https://po-fp.physikelearning.de/api/user/${sNumber}`)
      .map(User.fromApiType)
      .catch(this.handleError);
  }

  private handleError(error): Observable<any> {
    let message = error;

    if (error instanceof HttpErrorResponse) {
      message = `${error.name}: ${error.message}`;
    }

    console.error(error);
    return Observable.throw(message);
  }
}
