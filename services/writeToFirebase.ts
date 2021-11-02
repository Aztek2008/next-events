import firebase from 'firebase/app';
import 'firebase/database';
import { apiFetching } from './apiFetching';

export const fetchEvents = async () => {
  try {
    const events = await apiFetching();
    const dbRef = firebase.database().ref('/events');

    dbRef.set(events);
  } catch (error) {
    console.error(`Error:`, error);
  }
};
