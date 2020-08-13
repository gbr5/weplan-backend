import EventCard from '@modules/suppliers/infra/typeorm/entities/EventCard';
import ICreateEventCardDTO from '@modules/suppliers/dtos/ICreateEventCardDTO';

export default interface IEventCardsRepository {
  create(data: ICreateEventCardDTO): Promise<EventCard>;
  findByCard(card_unique_name: string): Promise<EventCard | undefined>;
  findByEvent(event_id: string): Promise<EventCard[]>;
  save(card: EventCard): Promise<EventCard>;
  delete(card: EventCard): Promise<void>;
}
