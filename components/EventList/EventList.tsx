import { IEvent } from '../../typings';
import { EventListItem } from '../EventListItem/EventListItem';
import styles from '../../styles/Home.module.css';

type Props = {
  events: IEvent[];
  makeFavorite: (eventId: number, isFavorite: boolean) => void;
};

export const EventList = ({ events, makeFavorite }: Props) => {
  return (
    <div className={styles.grid}>
      {events?.length > 0 ? (
        events.map((event: IEvent) => (
          <EventListItem
            key={event.id}
            event={event}
            makeFavorite={makeFavorite}
          />
        ))
      ) : (
        <span>No events</span>
      )}
    </div>
  );
};
