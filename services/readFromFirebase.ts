import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = `https://next-event-a40d0-default-rtdb.europe-west1.firebasedatabase.app/`;

export const readAllEventsFromDB = createAsyncThunk(
  'EVENTS/READ_EVENTS_FROM_DB',
  async () => {
    try {
      const events = await axios.get(`${BASE_URL}/events.json`);
      return events.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const readFavoriteEventsFromDB = createAsyncThunk(
  'EVENTS/READ_FAV_EVENTS_FROM_DB',
  async (userId: string | undefined) => {
    try {
      const events = await axios.get(`${BASE_URL}user-events/${userId}.json`);

      const eventObject = events.data;
      const bufferEvents = [];

      // RESTRUCT OBJECT TO ARRAY
      for (const key in eventObject) {
        if (Object.prototype.hasOwnProperty.call(eventObject, key)) {
          const element = eventObject[key];
          bufferEvents.push(element);
        }
      }

      return bufferEvents;
      // setFavEvents(bufferEvents);
    } catch (error) {
      console.error(error);
    }
  }
);
