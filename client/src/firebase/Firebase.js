import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAxdtgazvgybT-OcWAMwoRnJmqo2tHvEZk",
  authDomain: "dating-ducks.firebaseapp.com",
  projectId: "dating-ducks",
  storageBucket:"dating-ducks.appspot.com",
  messagingSenderId: "546817262064",
  appId: "1:546817262064:web:d30d6e57c1494ea150dd35"
});

export default firebaseApp;