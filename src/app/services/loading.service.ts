import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class LoadingService {
  isLoading = new BehaviorSubject(false);

  private readonly subscriptions: Subscription[] = [];

  constructor() {}

  add(obs: Observable<any>): Observable<any> {
    this.isLoading.next(true);
    const sub = obs.subscribe(
      () => {},
      () => this.done(sub),
      () => this.done(sub)
    );
    this.subscriptions.push(sub);
    return obs;
  }

  private done(sub: Subscription) {
    sub.unsubscribe();
    this.checkSubs();
  }

  private checkSubs() {
    this.subscriptions.forEach((sub, index) => {
      if (sub.closed) {
        this.subscriptions.splice(index);
      }
    });
    if (!this.subscriptions.length) {
      this.isLoading.next(false);
    }
  }
}
