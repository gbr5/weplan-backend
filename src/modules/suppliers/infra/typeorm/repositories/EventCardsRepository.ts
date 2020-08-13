import { getRepository, Repository } from 'typeorm';

import IEventCardsRepository from '@modules/suppliers/repositories/IEventCardsRepository';
import ICreateEventCardDTO from '@modules/suppliers/dtos/ICreateEventCardDTO';
import EventCard from '@modules/suppliers/infra/typeorm/entities/EventCard';

class EventCardRepository implements IEventCardsRepository {
  private ormRepository: Repository<EventCard>;

  constructor() {
    this.ormRepository = getRepository(EventCard);
  }

  public async findByCard(
    card_unique_name: string,
  ): Promise<EventCard | undefined> {
    console.log(card_unique_name, ' => finByCard - Event Card Repository');
    const findEventCard = await this.ormRepository.findOne({
      where: { card_unique_name },
    });

    return findEventCard;
  }

  public async findByEvent(event_id: string): Promise<EventCard[]> {
    const findEventCard = await this.ormRepository.find({
      where: { event_id },
    });

    return findEventCard;
  }

  public async create({
    event_id,
    card_unique_name,
  }: ICreateEventCardDTO): Promise<EventCard> {
    const card = this.ormRepository.create({
      event_id,
      card_unique_name,
    });

    await this.ormRepository.save(card);

    return card;
  }

  public async save(card: EventCard): Promise<EventCard> {
    return this.ormRepository.save(card);
  }

  public async delete({ card_unique_name }: EventCard): Promise<void> {
    await this.ormRepository.delete({
      card_unique_name,
    });
  }
}

export default EventCardRepository;
