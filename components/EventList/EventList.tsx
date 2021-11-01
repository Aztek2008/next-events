import { useState, MouseEvent } from 'react';
import { IEvent } from '../../typings';
import { EventListItem } from '../EventListItem/EventListItem';
import styles from '../../styles/Home.module.css';

type Props = {
  events: IEvent[];
  makeStarred: (eventId: string | undefined, isFavorite: boolean) => void;
};

export const EventList = ({ events, makeStarred }: Props) => {
  return (
    <div className={styles.grid}>
      {events.map((event: IEvent) => (
        <EventListItem key={event.id} event={event} makeStarred={makeStarred} />
      ))}
    </div>
  );
};
