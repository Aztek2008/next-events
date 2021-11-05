import { IEvent } from '../../typings';
import { EventListItem } from './EventListItem';
import styles from '../../styles/Home.module.css';

type Props = {
  events: IEvent[] | undefined;
};

export const EventList = ({ events }: Props) => {
  if (!events) {
    return <span>No events</span>;
  }

  return (
    <div className={styles.grid}>
      {events?.map((event: IEvent) => (
        <EventListItem key={event.id} {...event} />
      ))}
    </div>
  );
};
