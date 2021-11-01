import { useEffect, useState, MouseEvent } from 'react';
import { IEvent } from '../typings';
import type { NextPage } from 'next';
import firebase from '../config/firebase-config';
import { NavBar } from '../components/NavBar/NavBar';
import { Header } from '../components/Header/Header';
import { apiFetching } from '../services/apiFetching';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AuthModal } from '../components/AuthModal/AuthModal';
import { EventList } from '../components/EventList/EventList';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);
  const [starred, setStarred] = useState<boolean>(false);
  // const [filteredIds, setFilteredIds] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [user, loading, error] = useAuthState(firebase.auth());

  const userEmail = user?.email;
  const userName = userEmail && userEmail.slice(0, userEmail?.indexOf('@'));
  // let favBets: (string | undefined)[] = [];

  useEffect(() => {
    const fetching = async () => {
      const events = await apiFetching();
      setEvents(events);
    };
    fetching();
  }, []);

  // console.log(`Loading:`, loading, '|', 'Current user: ', user?.email);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const signingOut = () => {
    firebase.auth().signOut();
  };

  const handleStarring = (eventId: string | undefined, isFavorite: boolean) => {
    console.log(`eventId`, eventId);
    console.log(`isFavorite`, isFavorite);
  };

  const eventItemMarkFavorite = (e: MouseEvent<Element>) => {
    const eventId = e.target.parentNode.id;

    // !filteredIds.includes(eventId) &&
    //   setFilteredIds((prev) => [...prev, eventId]);
    // events[0].is_open = !events[0].is_open;

    const filtered: IEvent | undefined = events.find(
      (event) => Number(event.id) === Number(eventId)
    );

    const filteredId = filtered?.id?.toString();
    const persistedEvent = filteredEvents.find(
      (filteredEvent) => Number(filteredEvent.id) === Number(filteredId)
    );

    if (filtered && !persistedEvent) {
      setFilteredEvents((prev) => [...prev, filtered]);
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
          <EventList events={events} makeStarred={handleStarring} />
        ) : (
          <span>No events</span>
        )}
      </main>
    </div>
  );
};

export default Home;
