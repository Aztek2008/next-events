import React from 'react';
import { SignButton } from '../SignButtons/SignButtons';

import styles from '../../styles/Home.module.css';

type HeaderProps = {
  user: string | null | undefined;
  signingOut: () => void;
  handleOpen: () => void;
  userName: string | null | undefined;
};

export const Header = ({
  user,
  signingOut,
  handleOpen,
  userName,
}: HeaderProps) => (
  <header className={styles.header}>
    <div className={styles.avatar}>{user && userName}</div>
    {user ? (
      <SignButton signOption={signingOut} text='sign out' />
    ) : (
      <SignButton signOption={handleOpen} text='sign in' />
    )}
  </header>
);
