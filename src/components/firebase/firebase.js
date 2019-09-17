import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};

class Firebase {
  constructor() {
    // console.log(config);
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  doSignInWithEmailAndPassword(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  doSignOut() {
    return this.auth.signOut();
  }

  doPasswordReset(email) {
    return this.auth.sendPasswordResetEmail(email);
  }

  doPasswordUpdate(password) {
    return this.auth.currentUser.updatePassword(password);
  }

  // *** Merge Auth and DB User API *** //
  onAuthUserListener(next, fallback) {
    return this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then((snapshot) => {
            const dbUser = snapshot.val();
            if (dbUser) {
              if (!dbUser.roles) {
                dbUser.roles = {};
              }
              const mergedUser = {
                uid: authUser.uid,
                email: authUser.email,
                ...dbUser,
              };
              next(mergedUser);
            } else {
              fallback();
            }
          });
      } else {
        fallback();
      }
    });
  }

  databaseRef() {
    return this.db.ref();
  }

  // *** user API ***
  user(uid) {
    return this.db.ref(`users/${uid}`);
  }

  users() {
    return this.db.ref('users');
  }

  // *** building API ***
  building(uid) {
    return this.db.ref(`buildings/${uid}`);
  }

  buildings() {
    return this.db.ref('buildings');
  }

  // *** params API ***
  params() {
    return this.db.ref('params');
  }

  // *** userPayment API ***
  userPayment(uid) {
    return this.db.ref(`userPayments/${uid}`);
  }

  userPayments() {
    return this.db.ref('userPayments');
  }
}

export default Firebase;
