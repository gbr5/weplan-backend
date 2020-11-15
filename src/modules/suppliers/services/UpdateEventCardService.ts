import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventCardsRepository from '@modules/suppliers/repositories/IEventCardsRepository';

import EventCard from '@modules/suppliers/infra/typeorm/entities/EventCard';

@injectable()
class UpdateEventCardService {
  constructor(
    @inject('EventCardsRepository')
    private eventCardsRepository: IEventCardsRepository,
  ) {}

  public async execute(
    event_id: string,
    card_unique_name: string,
  ): Promise<EventCard> {
    const eventCard = await this.eventCardsRepository.findByCard(
      card_unique_name,
    );

    if (!eventCard) {
      throw new AppError('EventCard not found.');
    }

    const eventCardExists = await this.eventCardsRepository.findByEvent(
      event_id,
    );

    if (eventCardExists) {
      throw new AppError('This event is already register to this card.');
    }

    eventCard.event_id = event_id;

    const updatedEventCard = await this.eventCardsRepository.save(eventCard);

    return updatedEventCard;
  }
}

export default UpdateEventCardService;
