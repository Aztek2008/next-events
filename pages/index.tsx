import { useState } from 'react';
import type { NextPage } from 'next';
import firebase from '../config/firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SignButton } from '../components/SignButtons/SignButtons';
import { AuthModal } from '../components/AuthModal/AuthModal';
import { events } from '../components/Events';
import Head from 'next/head';

import styles from '../styles/Home.module.css';
import { NavBar } from '../components/NavBar/NavBar';
import { EventList } from '../components/EventList/EventList';
import { Header } from '../components/Header/Header';

const Home: NextPage = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [user, loading, error] = useAuthState(firebase.auth());
  const userEmail = user?.email;
  const userName = userEmail && userEmail.slice(0, userEmail?.indexOf('@'));

  console.log(`Loading:`, loading, '|', 'Current user: ', user?.email);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const signingOut = () => {
    firebase.auth().signOut();
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
        <EventList />
      </main>
    </div>
  );
};

export default Home;
