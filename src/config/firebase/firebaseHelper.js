import firebase from 'firebase/app';
// import 'firebase/app'
import 'firebase/database';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig.config);

const auth = firebase.auth();
const database = firebase.database();

const login = (email, password) => auth.signInWithEmailAndPassword(email, password);
const logout = () => auth.signOut();

const firebaseHelper = {
  database,
  auth,
  login,
  logout,
};

export default firebaseHelper;
