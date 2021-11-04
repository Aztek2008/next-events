import { IEvent } from '../typings';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import firebase from '../config/firebase-config';
import { NavBar } from '../components/NavBar/NavBar';
import { Header } from '../components/Header/Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AuthModal } from '../components/AuthModal/AuthModal';
import { EventList } from '../components/EventList/EventList';
import {
  removeFavoriteEventFromDB,
  saveFavoriteEventToDB,
  writeAllEventsToDB,
} from '../services/writeToFirebase';
import {
  readAllEventsFromDB,
  readFavoriteEventsFromDB,
} from '../services/readFromFirebase';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [favoriteEvents, setFavoriteEvents] = useState<IEvent[]>([]);
  const [favoriteChecked, setFavoriteCheckecd] = useState<boolean>(false);
  const [starTrigger, setStarTrigger] = useState<boolean>(false);
  const [user, loading, error] = useAuthState(firebase.auth());
  const [open, setOpen] = useState<boolean>(false);

  const userEmail = user?.email;
  const USER_ID = process.env.NEXT_PUBLIC_EVENT_API_CLIENT_ID;
  const userName = userEmail && userEmail.slice(0, userEmail?.indexOf('@'));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const signingOut = () => {
    firebase.auth().signOut();
  };

  useEffect(() => {
    writeAllEventsToDB();
    readAllEventsFromDB(setEvents);
  }, []);

  useEffect(() => {
    readFavoriteEventsFromDB(USER_ID, setFavoriteEvents);
  }, [favoriteChecked, starTrigger]);

  // console.log(`Loading:`, loading, '|', 'Current user: ', user?.email);

  const handleFavoriteList = (eventId: number, isFavorite: boolean) => {
    // REMOVE DISLIKED EVENT FROM ARRAY
    if (!isFavorite) {
      const eventToRemoveFromList: IEvent | undefined = favoriteEvents.find(
        (event) => Number(event.id) === Number(eventId)
      );

      if (eventToRemoveFromList) {
        removeFavoriteEventFromDB(USER_ID, eventToRemoveFromList.fav_id);
        setStarTrigger((state) => !state);
      }
    }

    if (isFavorite) {
      // EVENT MARKED AT LIST ITEM COMPONENT
      const markedEvent = events.find(
        (event) => Number(event.id) === Number(eventId)
      );

      // EVENT PERSISTED AT FILTERED AND EQUALS TO MARKED AT LIST ITEM COMPONENT
      const persistedEvent = favoriteEvents.find(
        (favoriteEvent) => favoriteEvent.id === markedEvent?.id
      );

      // SAVE TO FAVORITES IF NO DOUBLES
      if (markedEvent && !persistedEvent) {
        saveFavoriteEventToDB(USER_ID, markedEvent);
        setStarTrigger((state) => !state);
      }
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Header
          user={user?.email}
          signingOut={signingOut}
          handleOpen={handleOpen}
          userName={userName}
        />
        <AuthModal open={open} handleClose={handleClose} />
        {user && <NavBar toggleFavorite={setFavoriteCheckecd} />}

        <EventList
          events={favoriteChecked ? favoriteEvents : events}
          makeFavorite={handleFavoriteList}
        />
      </main>
    </div>
  );
};

export default Home;
