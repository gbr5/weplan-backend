import EventTaskNote from '@modules/events/infra/typeorm/entities/EventTaskNote';
import ICreateEventTaskNoteDTO from '@modules/events/dtos/ICreateEventTaskNoteDTO';

export default interface IEventTaskNotesRepository {
  create(data: ICreateEventTaskNoteDTO): Promise<EventTaskNote>;
  findById(id: string): Promise<EventTaskNote | undefined>;
  findByTaskId(task_id: string): Promise<EventTaskNote[]>;
  save(event: EventTaskNote): Promise<EventTaskNote>;
  delete(event_id: string): Promise<void>;
}
