import EventInspirationImage from '@modules/events/infra/typeorm/entities/EventInspirationImage';
import ICreateEventInspirationImageDTO from '@modules/events/dtos/ICreateEventInspirationImageDTO';

export default interface IEventInspirationImagesRepository {
  findById(id: string): Promise<EventInspirationImage | undefined>;
  findByEvent(event_id: string): Promise<EventInspirationImage[]>;
  create(data: ICreateEventInspirationImageDTO): Promise<EventInspirationImage>;
  save(
    eventInspirationImage: EventInspirationImage,
  ): Promise<EventInspirationImage>;
  delete(eventInspirationImage: EventInspirationImage): Promise<void>;
}
