import firebase from 'firebase/app';
import 'firebase/database';
import { IEvent } from '../typings';
import { apiFetching } from './apiFetching';

export const writeAllEventsToDB = async () => {
  try {
    const events = await apiFetching();
    const dbRef = firebase.database().ref('/events');

    dbRef.set(events);
  } catch (error) {
    console.error(`Error:`, error);
  }
};

export const saveFavoriteEventToDB = async (
  userId: string | undefined,
  event: IEvent
) => {
  try {
    const dbRef = firebase.database().ref('/user-events').child(userId);

    const newEventRef = dbRef.push(event);

    newEventRef.update({ fav_id: newEventRef.key });

    const pathEndPoint = newEventRef.key;
    console.log(`Create item with reference endpoint: `, pathEndPoint);
  } catch (error) {
    console.error(`Error:`, error);
  }
};

export const removeFavoriteEventFromDB = async (
  userId: string | undefined,
  eventId: string
) => {
  try {
    const eventRef = firebase
      .database()
      .ref(`/user-events/${userId}/${eventId}`);

    const pathEndPoint = eventRef.key;
    eventRef.remove();

    console.log(`Removed item: `, pathEndPoint);
  } catch (error) {
    console.error(`Error:`, error);
  }
};
