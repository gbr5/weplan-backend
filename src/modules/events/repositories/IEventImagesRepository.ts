import EventImage from '@modules/events/infra/typeorm/entities/EventImage';
import ICreateEventImageDTO from '@modules/events/dtos/ICreateEventImageDTO';

export default interface IEventImagesRepository {
  findById(id: string): Promise<EventImage | undefined>;
  findByEvent(event_id: string): Promise<EventImage[]>;
  create(data: ICreateEventImageDTO): Promise<EventImage>;
  save(eventImage: EventImage): Promise<EventImage>;
  delete(eventImage: EventImage): Promise<void>;
}
