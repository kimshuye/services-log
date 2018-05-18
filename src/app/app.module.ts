import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule,NoopAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

//Material design modules
import {  
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatGridListModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatListModule,
  MatIconModule,

 } from '@angular/material';

import { environment } from '../environments/environment';
// firebase configuration
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { TopNavComponent } from './ui/top-nav/top-nav.component';
import { ReadmePageComponent } from './ui/readme-page/readme-page.component';
import { UserLoginComponent } from './ui/user-login/user-login.component';
import { AuthService } from './core/auth.service';
import { NotifyService } from './core/notify.service';
import { UserFormComponent } from './ui/user-form/user-form.component';
import { UserProfileComponent } from './ui/user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    ReadmePageComponent,
    UserLoginComponent,
    UserFormComponent,
    UserProfileComponent,        
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

    BrowserAnimationsModule,
    NoopAnimationsModule,

    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase,'services-log-app'),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,

    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
  ],

  providers: [AuthService, NotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
