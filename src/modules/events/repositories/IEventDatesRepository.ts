import EventDate from '@modules/events/infra/typeorm/entities/EventDate';
import ICreateEventDateDTO from '@modules/events/dtos/IEventDateDTO';

export default interface IEventDatesRepository {
  create(data: ICreateEventDateDTO): Promise<EventDate>;
  findById(event_id: string): Promise<EventDate | undefined>;
  findByEventId(event_id: string): Promise<EventDate[]>;
  save(event: EventDate): Promise<EventDate>;
  delete(event_id: string): Promise<void>;
}
