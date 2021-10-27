import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: 'next-event-a40d0.firebaseapp.com',
  databaseURL:
    'https://next-event-a40d0-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'next-event-a40d0',
  storageBucket: 'next-event-a40d0.appspot.com',
  messagingSenderId: '508892583677',
  appId: '1:508892583677:web:e3b6a63c3eaad305d25094',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log('Firebase initiated successfully');
  // console.log(`firebase: `, firebase.apps);
}
export default firebase;
