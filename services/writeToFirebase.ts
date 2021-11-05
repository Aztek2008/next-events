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

export const saveFavoriteEventToDB = async (userId: string, event: IEvent) => {
  try {
    const dbRef = firebase.database().ref('/user-events').child(userId);
    const favDbRef = dbRef.push(event);
    const pathEndPoint = favDbRef.key;
    // UPDATE EVENT WITH ENDPOINT ID
    favDbRef.update({ fav_id: pathEndPoint });

    console.log(`Item with reference endpoint ${pathEndPoint} created`);
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
    // DELETE EVENT BY FAV_ID
    eventRef.remove();

    console.log(`Removed item ${pathEndPoint}`);
  } catch (error) {
    console.error(`Error:`, error);
  }
};
