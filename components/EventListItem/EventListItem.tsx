import React, { useState, MouseEvent } from 'react';
import { IEvent } from '../../typings';
import Image from 'next/image';

import styles from '../../styles/Home.module.css';

type Props = {
  event: IEvent;
  makeStarred: (eventId: string | undefined, isFavorite: boolean) => void;
};

export const EventListItem = ({ event, makeStarred }: Props) => {
  const [favorite, setFavorite] = useState<boolean>(false);

  const handleClick = () => {
    makeStarred(event.id, favorite);

    setFavorite((prev) => !prev);
  };

  return (
    <div className={styles.card} id={event.id}>
      <span>{event.type}</span>
      <h3>{event.title}</h3>
      <p>{event.description}</p>

      <Image
        src={event.performers[0].image}
        alt={event.title}
        layout='responsive'
        width={100}
        height={70}
      />

      {favorite ? (
        <div onClick={handleClick} className={styles.fav}>
          &#9733;
        </div>
      ) : (
        <div onClick={handleClick} className={styles.fav}>
          &#9734;
        </div>
      )}
    </div>
  );
};
