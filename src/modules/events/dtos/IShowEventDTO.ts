import Event from '@modules/events/infra/typeorm/entities/Event';
import UserCheckList from '@modules/events/infra/typeorm/entities/UserCheckList';
import Guest from '@modules/events/infra/typeorm/entities/Guest';
import EventSupplier from '@modules/events/infra/typeorm/entities/EventSupplier';
import EventNote from '@modules/events/infra/typeorm/entities/EventNote';

export default interface IShowEventDTO {
  event: Event;
  checkLists: UserCheckList[];
  guests: Guest[];
  suppliers: EventSupplier[];
  eventNotes: EventNote[];
}