import EventType from '@modules/events/infra/typeorm/entities/EventType';
import ICreateEventTypeDTO from '@modules/events/dtos/ICreateEventTypeDTO';

export default interface IEventTypesRepository {
  create(data: ICreateEventTypeDTO): Promise<EventType>;
  findByName(name: string): Promise<EventType | undefined>;
  findAll(): Promise<EventType[]>;
  save(event: EventType): Promise<EventType>;
}
