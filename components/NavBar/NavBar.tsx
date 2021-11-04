import React, { useState } from 'react';

import styles from '../../styles/Home.module.css';

type Props = {
  toggleFavorite: (isFavorite: boolean) => void;
};

export const NavBar = ({ toggleFavorite }: Props) => {
  const [favorite, setFavorite] = useState<boolean>(false);

  const handleClick = (): void => {
    setFavorite((prev) => !prev);
    toggleFavorite(!favorite);
  };

  return (
    <nav className={styles.header}>
      <button onClick={handleClick} className={styles.navButton}>
        Favorites
      </button>
      <button onClick={handleClick} className={styles.navButton}>
        All
      </button>
    </nav>
  );
};
