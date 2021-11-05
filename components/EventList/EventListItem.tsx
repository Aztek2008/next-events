import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import React, { useEffect, useState } from 'react';
import { IEvent } from '../../typings';
import Image from 'next/image';

import styles from '../../styles/Home.module.css';
import { useAppDispatch } from '../../redux/hooks';
import { setCandidate } from '../../redux/eventsSlice';

export const EventListItem = (event: IEvent) => {
  const [star, setStar] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    event.fav_id && setStar(true);
  }, [event]);

  const handleClick = (): void => {
    setStar((prev) => !prev);
    dispatch(setCandidate({ eventId: event.id, hasStar: !star }));
  };

  return (
    <div className={styles.card}>
      <span className={styles.eventTitle}>{event.type}</span>
      <h3>{event.title}</h3>
      <p>{event.description}</p>

      <Image
        src={event.performers[0]?.image}
        alt={event.title}
        layout='responsive'
        width={100}
        height={70}
      />

      <div onClick={handleClick} className={styles.fav}>
        {star ? <StarRoundedIcon /> : <StarOutlineRoundedIcon />}
      </div>
    </div>
  );
};
