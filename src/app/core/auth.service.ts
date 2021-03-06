import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NotifyService } from './notify.service';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';

interface User {
  uid?: string;
  username?: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
}

interface UserDb {
  $username:string;
  uid?:string;
}

@Injectable()
export class AuthService {

  user: Observable<User | null>;
  currentUser:UserDb;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private db:AngularFireDatabase,
              private router: Router,
              private notify: NotifyService) {

    this.user = this.afAuth.authState
      .switchMap((user) => {
        if (user) {
          // this.currentUser.uid = user.uid;
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // this.currentUser.uid = null;
          return Observable.of(null);
        }
      });
      this.user.subscribe(user => {
        // if (user) {
        //   this.currentUser.$username = user.username;
        // }
      });
  }

  ////// OAuth Methods /////

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: firebase.auth.AuthProvider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(credential.user);
      })
      .catch((error) => this.handleError(error) );
  }

  //// Anonymous Auth ////

  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
      .then((user) => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(user); // if using firestore
      })
      .catch((error) => {
        console.error(error.code);
        console.error(error.message);
        this.handleError(error);
      });
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string,username:string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        user.username = username;
        return this.updateUserData(user); // if using firestore
      })
      .catch((error) => this.handleError(error) );
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.notify.update('Welcome to Firestarter!!!', 'success')
        return this.updateUserData(user); // if using firestore
      })
      .catch((error) => this.handleError(error) );
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch((error) => this.handleError(error));
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user: User) {

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      username: user.username || null,
      email: user.email || null,
      displayName: user.displayName || 'nameless user',
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ',
    };
    
    const data1 = {
      email: user.email ,
      username: user.username 
    };
    
    var update1 = {};
    update1[`/users/${user.uid}`] = data1;
    this.db.database.ref().update(update1);

    const data2 = {
      uid: user.uid
    };
    
    var update2 = {};
    update2[`/usernames/${user.username}`] = data2;
    this.db.database.ref().update(update2);

    return userRef.set(data);
  }

  get hasUsername() {
    return this.currentUser.$username ? true : false
  }

  checkUsername(username:string){
    username = username.toLowerCase();
    return this.db.object(`usernames/${username}` )
      .snapshotChanges()
      .map(c => ({ $username: c.payload.key, ...c.payload.val() }));
  }

}
