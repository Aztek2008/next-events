import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../../config/firebase-config';

import styles from '../../styles/Home.module.css';

const uiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
};

const AuthForm = () => {
  return (
    <div className={styles.authForm}>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};
export default AuthForm;
