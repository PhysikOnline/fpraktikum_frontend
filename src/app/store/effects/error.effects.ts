import { Injectable } from '@angular/core';

import * as RouterActions from '../actions/router.action';
import { Actions, Effect } from '@ngrx/effects';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { RouterNavigationAction } from '@ngrx/router-store';
import { take } from 'rxjs/operators/take';
import { RouterStateUrl } from '../index';
import { GlobalUserUpdate, TokenUpdate } from '../actions/global-user.action';
import { switchMap } from 'rxjs/operators';
import { AlertService } from '../../services/alert.service';
import { ErrorDialogComponent } from '../../dialogs/error-dialog/error-dialog.component';
import * as regActions from '../../registration/store/actions';

@Injectable()
export class ErrorEffects {
  constructor(private actions$: Actions, private alert: AlertService) {}

  @Effect({ dispatch: false })
  registrationErrors$ = this.actions$
    .ofType(
      regActions.LOAD_USER_FAIL,
      regActions.LOAD_REGISTRATION_INFO_FAIL,
      regActions.SEND_REGISTRATION_FAIL,
      regActions.CHECK_PARTNER_FAIL,
      regActions.ACCEPT_DENY_PARTNER_FAIL,
      regActions.SEND_WAITLIST_FAIL,
      regActions.SIGNOUT_FAIL
    )
    .pipe(
      tap(a => {
        let text;
        const error = (<any>a).payload;
        switch (a.type) {
          case regActions.LOAD_USER_FAIL:
            text =
              'Beim Laden der Nutzerinformationen ist etwas schief gelaufen!';
            break;
          case regActions.SEND_REGISTRATION_FAIL:
            text =
              'Beim Laden der Nutzerinformationen ist etwas schief gelaufen!';
            break;

          default:
            text = 'Etwas ist schief gelaufen!';
            break;
        }
        this.showError(text, error);
      })
    );

  private showError(text: string, error: any) {
    this.alert.showDialog(ErrorDialogComponent, {
      content: text,
      error,
    });
  }
}
