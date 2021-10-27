import React from 'react';

import styles from '../../styles/Home.module.css';

export const NavBar = () => {
  return (
    <nav className={styles.header}>
      <button className={styles.navButton}>Favorites</button>
      <button className={styles.navButton}>All</button>
    </nav>
  );
};
