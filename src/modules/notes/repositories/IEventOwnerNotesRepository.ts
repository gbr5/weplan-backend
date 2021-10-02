import EventOwnerNote from '@modules/notes/infra/typeorm/entities/EventOwnerNote';
import ICreateEventOwnerNoteDTO from '@modules/notes/dtos/ICreateEventOwnerNoteDTO';

export default interface IEventOwnerNotesRepository {
  create(data: ICreateEventOwnerNoteDTO): Promise<EventOwnerNote>;
  findById(id: string): Promise<EventOwnerNote | undefined>;
  findByOwnerId(owner_id: string): Promise<EventOwnerNote[]>;
  save(eventOwnerNote: EventOwnerNote): Promise<EventOwnerNote>;
  delete(eventOwnerNote: EventOwnerNote): Promise<void>;
}
