import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { IEvent } from '../typings';

export const readAllEventsFromDB = async (
  setEvents: Dispatch<SetStateAction<IEvent[]>>
) => {
  try {
    const events = await axios.get(
      `https://next-event-a40d0-default-rtdb.europe-west1.firebasedatabase.app/events.json`
    );
    setEvents(events.data);
  } catch (error) {
    console.error(error);
  }
};

export const readFavoriteEventsFromDB = async (
  userId: string | undefined,
  setFavEvents: Dispatch<SetStateAction<IEvent[]>>
) => {
  try {
    const events = await axios.get(
      `https://next-event-a40d0-default-rtdb.europe-west1.firebasedatabase.app/user-events/${userId}.json`
    );

    const eventObject = events.data;
    const bufferEvents = [];

    // RESTRUCT OBJECT TO ARRAY
    for (const key in eventObject) {
      if (Object.prototype.hasOwnProperty.call(eventObject, key)) {
        const element = eventObject[key];
        bufferEvents.push(element);
      }
    }

    setFavEvents(bufferEvents);
  } catch (error) {
    console.error(error);
  }
};
