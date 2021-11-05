import { IEvent } from '../typings';
import { AppDispatch } from '../redux/store';
import { setStarTrigger } from '../redux/interfaceSlice';
import { Candidate } from '../redux/eventsSlice';
import {
  removeFavoriteEventFromDB,
  saveFavoriteEventToDB,
} from './writeToFirebase';

export const checkIfItemIsFavorite = (
  events: IEvent[],
  favoriteEvents: IEvent[] | undefined,
  candidate: Candidate,
  dispatch: AppDispatch
) => {
  const { eventId, hasStar } = candidate;
  const USER_ID = process.env.NEXT_PUBLIC_EVENT_API_CLIENT_ID;

  if (!hasStar) {
    const eventToRemoveFromList: IEvent | undefined = favoriteEvents?.find(
      (event) => Number(event.id) === Number(eventId)
    );

    if (eventToRemoveFromList) {
      removeFavoriteEventFromDB(USER_ID, eventToRemoveFromList.fav_id);
      dispatch(setStarTrigger());
    }
  }

  if (hasStar) {
    // EVENT MARKED AT LIST ITEM COMPONENT
    const markedEvent = events.find(
      (event) => Number(event.id) === Number(eventId)
    );

    // EVENT PERSISTED AT FILTERED AND EQUALS TO MARKED AT LIST ITEM COMPONENT
    const persistedEvent = favoriteEvents?.find(
      (favoriteEvent) => favoriteEvent.id === markedEvent?.id
    );

    // SAVE TO FAVORITES IF NO DOUBLES
    if (markedEvent && !persistedEvent && USER_ID) {
      saveFavoriteEventToDB(USER_ID, markedEvent);
      dispatch(setStarTrigger());
    }
  }
};
