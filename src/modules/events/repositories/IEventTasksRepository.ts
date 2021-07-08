import EventTask from '@modules/events/infra/typeorm/entities/EventTask';
import ICreateEventTaskDTO from '@modules/events/dtos/ICreateEventTaskDTO';

export default interface IEventTasksRepository {
  create(data: ICreateEventTaskDTO): Promise<EventTask>;
  findById(event_id: string): Promise<EventTask | undefined>;
  findByEventId(event_id: string): Promise<EventTask[]>;
  save(event: EventTask): Promise<EventTask>;
  delete(event_id: string): Promise<void>;
}
