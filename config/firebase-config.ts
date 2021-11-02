import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_EVENT_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_EVENT_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_EVENT_DB_URL,
  projectId: process.env.NEXT_PUBLIC_EVENT_PROJ_ID,
  storageBucket: process.env.NEXT_PUBLIC_EVENT_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_EVENT_MSG_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_EVENT_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log('Firebase initiated successfully');
}

export default firebase;
