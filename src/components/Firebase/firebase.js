import app from "firebase/app";
import "firebase/auth";
import 'firebase/database';
import "firebase/storage";

const config = {
  apiKey: "AIzaSyAHqjBVbdbKWehuh9TnoAgv-moB_Cdp9-4",
  authDomain: "react-hotel-website.firebaseapp.com",
  databaseURL: "https://react-hotel-website.firebaseio.com",
  projectId: "react-hotel-website",
  storageBucket: "react-hotel-website.appspot.com",
  messagingSenderId: "715617858064",
  appId: "1:715617858064:web:73a364b8991238b84c5095",
  measurementId: "G-Q1JX441LJX",
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
    this.storage = app.storage();
  }

  // Authentication API
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();

  activity = uid => this.db.ref(`activities/${uid}`);
  activities = () => this.db.ref('activities');
}

export default Firebase;
