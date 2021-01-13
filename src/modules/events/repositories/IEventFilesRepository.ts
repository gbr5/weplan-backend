import EventFile from '@modules/events/infra/typeorm/entities/EventFile';
import ICreateEventFileDTO from '@modules/events/dtos/ICreateEventFileDTO';

export default interface IEventFilesRepository {
  findById(id: string): Promise<EventFile | undefined>;
  findByEvent(event_id: string): Promise<EventFile[]>;
  create(data: ICreateEventFileDTO): Promise<EventFile>;
  save(eventFile: EventFile): Promise<EventFile>;
  delete(eventFile: EventFile): Promise<void>;
}
