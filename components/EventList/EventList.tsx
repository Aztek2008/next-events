import { events } from '../Events';

import styles from '../../styles/Home.module.css';

export const EventList = () => (
  <div className={styles.grid}>
    {events.map((event, idx) => (
      <div key={event.title + idx} className={styles.card}>
        <h2>{event.title} &rarr;</h2>
        <p>{event.content}</p>
        {event.favorite ? <div className={styles.fav}>&#x2B50;</div> : null}
      </div>
    ))}
  </div>
);
