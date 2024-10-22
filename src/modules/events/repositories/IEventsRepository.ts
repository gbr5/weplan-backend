import Event from '@modules/events/infra/typeorm/entities/Event';
import ICreateEventDTO from '@modules/events/dtos/ICreateEventDTO';

export default interface IEventsRepository {
  create(data: ICreateEventDTO): Promise<Event>;
  findById(event_id: string): Promise<Event | undefined>;
  findByName(trimmed_name: string): Promise<Event | undefined>;
  findByUserId(id: string): Promise<Event[]>;
  findAllByIds(ids: string[]): Promise<Event[]>;
  save(event: Event): Promise<Event>;
  delete(event_id: string): Promise<void>;
}
