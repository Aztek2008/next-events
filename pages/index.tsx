import axios from 'axios';
import { IEvent } from '../typings';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import firebase from '../config/firebase-config';
import { NavBar } from '../components/NavBar/NavBar';
import { Header } from '../components/Header/Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AuthModal } from '../components/AuthModal/AuthModal';
import { EventList } from '../components/EventList/EventList';
import { fetchEvents } from '../services/writeToFirebase';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [user, loading, error] = useAuthState(firebase.auth());

  const userEmail = user?.email;
  const userName = userEmail && userEmail.slice(0, userEmail?.indexOf('@'));

  useEffect(() => {
    fetchEvents();
    const readFromDB = async () => {
      const events = await axios.get(
        `https://next-event-a40d0-default-rtdb.europe-west1.firebasedatabase.app/events.json`
      );
      setEvents(events.data);
    };
    readFromDB();
  }, []);

  // console.log(`Loading:`, loading, '|', 'Current user: ', user?.email);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const signingOut = () => {
    firebase.auth().signOut();
  };

  const handleMarkAsFavorite = (eventId: number, isFavorite: boolean) => {
    if (filteredEvents.length && isFavorite === false) {
      const eventToRemove: IEvent | undefined = filteredEvents.find(
        (event) => Number(event.id) === Number(eventId)
      );
      const index = filteredEvents.indexOf(eventToRemove);
      setFilteredEvents(filteredEvents.splice(index, 1));
    }

    const filteredEvent = events.find(
      (event) => Number(event.id) === Number(eventId)
    );

    const filteredEventId = filteredEvent?.id?.toString();

    const persistedEvent = filteredEvents.find(
      (filteredEvent) => Number(filteredEvent.id) === Number(filteredEventId)
    );

    if (filteredEvent && !persistedEvent) {
      setFilteredEvents((prev) => [...prev, filteredEvent]);
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
        {user && <NavBar />}
        {events.length > 0 ? (
          <EventList events={events} makeStarred={handleMarkAsFavorite} />
        ) : (
          <span>No events</span>
        )}
      </main>
    </div>
  );
};

export default Home;
