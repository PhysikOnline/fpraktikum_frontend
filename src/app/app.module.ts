import * as Raven from 'raven-js';
import { ErrorHandler, NgModule } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { RegistrationModule } from './registration/registration.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { StarRatingModule } from 'angular-star-rating';
import { AppComponent } from './app.component';
import { ThemeModule } from './theme/theme.module';
import { DialogsModule } from './dialogs/dialogs.module';
import { ServiceModule } from './services/service.module';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

if (environment.production) {
  // Raven.config('https://4f7ddb18431c44bd9398744306a42fd0@po-sentry.physikelearning.de/8').install();
}

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err);
  }
}

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'registration' },
  {
    path: 'registration',
    loadChildren: './registration/registration.module#RegistrationModule',
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ServiceModule,
    BrowserAnimationsModule,
    FormsModule,
    StarRatingModule.forRoot(),
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot({}),
  ],
  // providers: environment.production ? [{ provide: ErrorHandler, useClass: RavenErrorHandler }] : [],
  bootstrap: [AppComponent],
})
export class AppModule {}
