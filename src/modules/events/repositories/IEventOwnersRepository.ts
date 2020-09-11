import EventOwner from '@modules/events/infra/typeorm/entities/EventOwner';
import ICreateEventOwnerDTO from '@modules/events/dtos/ICreateEventOwnerDTO';

export default interface IEventOwnersRepository {
  create(data: ICreateEventOwnerDTO): Promise<EventOwner>;
  findByEventAndOwnerId(
    owner_id: string,
    event_id: string,
  ): Promise<EventOwner | undefined>;
  findByEvent(event_id: string): Promise<EventOwner[]>;
  findById(id: string): Promise<EventOwner | undefined>;
  save(owner: EventOwner): Promise<EventOwner>;
  delete(owner: EventOwner): Promise<void>;
}
