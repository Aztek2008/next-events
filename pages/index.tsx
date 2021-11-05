import type { NextPage } from 'next';
import { useEffect } from 'react';
import firebase from '../config/firebase-config';
import { NavBar } from '../components/NavBar/NavBar';
import { Header } from '../components/Header/Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AuthModal } from '../components/Auth/AuthModal';
import { EventList } from '../components/EventList/EventList';
import { writeAllEventsToDB } from '../services/writeToFirebase';
import { checkIfItemIsFavorite } from '../services/checkIfItemIsFavorite';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setOpen } from '../redux/interfaceSlice';
import { CircularProgress } from '@mui/material';
import {
  readAllEventsFromDB,
  readFavoriteEventsFromDB,
} from '../services/readFromFirebase';

import styles from '../styles/Home.module.css';
//=========================================================================
const Home: NextPage = () => {
  const { events, favoriteEvents, candidate, pending, error } = useAppSelector(
    (state) => state.events
  );
  const { favoriteChecked, starTrigger, open } = useAppSelector(
    (state) => state.interface
  );
  const [user, loading, err] = useAuthState(firebase.auth());

  const userEmail = user?.email;
  const USER_ID = process.env.NEXT_PUBLIC_EVENT_API_CLIENT_ID;
  const userName = userEmail && userEmail.slice(0, userEmail?.indexOf('@'));

  const dispatch = useAppDispatch();
  const handleOpen = () => dispatch(setOpen(true));
  const handleClose = () => dispatch(setOpen(false));
  const signingOut = () => {
    firebase.auth().signOut();
  };

  // FETCH FROM API, WRITE TO FIREBASE THEN READ FROM FIREBASE
  useEffect(() => {
    writeAllEventsToDB();
    dispatch(readAllEventsFromDB());
    // eslint-disable-next-line
  }, []);

  // READ FAVORITE EVENTS FROM FIREBASE
  useEffect(() => {
    dispatch(readFavoriteEventsFromDB(USER_ID));
    // eslint-disable-next-line
  }, [favoriteChecked, starTrigger]);

  // REMOVE AND ADD FAVORITE EVENTS TO FIREBASE
  useEffect(() => {
    checkIfItemIsFavorite(events, favoriteEvents, candidate, dispatch);
    // eslint-disable-next-line
  }, [candidate]);

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
        {pending && <CircularProgress className={styles.loader} />}
        {error && <p>We get an error! </p>}
        <EventList events={favoriteChecked ? favoriteEvents : events} />
      </main>
    </div>
  );
};

export default Home;
