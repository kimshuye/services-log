import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase,'services-log-app'),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    
  ],
  providers: [AuthService, NotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
