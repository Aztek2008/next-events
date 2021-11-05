import { IEvent } from '../typings';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  readAllEventsFromDB,
  readFavoriteEventsFromDB,
} from '../services/readFromFirebase';

export type Candidate = { eventId: number; hasStar: boolean };

export type EventState = {
  events: IEvent[];
  favoriteEvents: IEvent[] | undefined;
  candidate: Candidate;
  pending: boolean;
  error: boolean;
};

const initialState: EventState = {
  events: [],
  favoriteEvents: [],
  candidate: { eventId: 0, hasStar: false },
  pending: false,
  error: false,
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, { payload }) => {
      state.events = payload;
    },
    setFavoriteEvents: (state, { payload }) => {
      state.favoriteEvents = payload;
    },
    setCandidate: (state, { payload }) => {
      state.candidate = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(readAllEventsFromDB.pending, (state) => {
        state.pending = true;
      })
      .addCase(readAllEventsFromDB.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.events = payload;
      })
      .addCase(readAllEventsFromDB.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(readFavoriteEventsFromDB.pending, (state) => {
        state.pending = true;
      })
      .addCase(readFavoriteEventsFromDB.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.favoriteEvents = payload;
      })
      .addCase(readFavoriteEventsFromDB.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export const { setEvents, setFavoriteEvents, setCandidate } =
  eventsSlice.actions;
export default eventsSlice.reducer;
