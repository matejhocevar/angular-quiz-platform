import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class AuthService {
  token: string;

  constructor(
    private router: Router,
    public af: AngularFireAuth
  ) {}

  signupUser(email: string, password: string) {
    this.af.auth.createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      );
  }

  signinUser(email: string, password: string) {
    // this.af.auth.setPersistence(firebase.auth().Persistence.LOCAL)
    //   .then(() => {
    //     return this.af.auth.signInWithEmailAndPassword(email, password)
        this.af.auth.signInWithEmailAndPassword(email, password)
          .then(
            (response: Response) => {
              this.router.navigate(['/']);
              this.af.auth.currentUser.getIdToken()
                .then((token: string) => this.token = token);
            })
          .catch(
            error => console.log(error)
          );
      // });
  }

  logout() {
    this.af.auth.signOut();
    this.token = null;
  }

  getToken() {
    this.af.auth.currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );

    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
