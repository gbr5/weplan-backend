import Event from '@modules/events/infra/typeorm/entities/Event';
import UserCheckList from '@modules/events/infra/typeorm/entities/UserCheckList';
import Guest from '@modules/events/infra/typeorm/entities/Guest';
import EventSupplier from '@modules/events/infra/typeorm/entities/EventSupplier';
import EventNote from '@modules/events/infra/typeorm/entities/EventNote';
import EventDate from '../infra/typeorm/entities/EventDate';

export default interface IShowEventDTO {
  event: Event;
  checkLists: UserCheckList[];
  guests: Guest[];
  suppliers: EventSupplier[];
  eventNotes: EventNote[];
  eventDates: EventDate[];
  event_avatar_url: string;
}
