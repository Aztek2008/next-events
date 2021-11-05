import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setFavoriteChecked } from '../../redux/interfaceSlice';

import styles from '../../styles/Home.module.css';

export const NavBar = () => {
  const dispatch = useAppDispatch();
  const { favoriteChecked } = useAppSelector((state) => state.interface);

  return (
    <nav className={styles.header}>
      <button
        onClick={() => dispatch(setFavoriteChecked())}
        className={`${styles.navButton} ${favoriteChecked && styles.active}`}
      >
        Favorites
      </button>
      <button
        onClick={() => dispatch(setFavoriteChecked())}
        className={`${styles.navButton} ${!favoriteChecked && styles.active}`}
      >
        All
      </button>
    </nav>
  );
};
