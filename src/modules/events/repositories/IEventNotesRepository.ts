import EventNote from '@modules/events/infra/typeorm/entities/EventNote';
import ICreateEventNoteDTO from '@modules/events/dtos/ICreateEventNoteDTO';

export default interface IEventNotesRepository {
  findById(id: string): Promise<EventNote | undefined>;
  findByEvent(event_id: string): Promise<EventNote[]>;
  create(data: ICreateEventNoteDTO): Promise<EventNote>;
  save(eventNote: EventNote): Promise<EventNote>;
  delete(id: string): Promise<void>;
}
