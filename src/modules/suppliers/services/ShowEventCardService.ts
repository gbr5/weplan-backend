import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventCardsRepository from '@modules/suppliers/repositories/IEventCardsRepository';

import EventCard from '@modules/suppliers/infra/typeorm/entities/EventCard';

@injectable()
class ShowEventCardService {
  constructor(
    @inject('EventCardsRepository')
    private eventCardsRepository: IEventCardsRepository,
  ) {}

  public async execute(
    card_unique_name: string,
  ): Promise<EventCard | undefined> {
    const card = await this.eventCardsRepository.findByCard(card_unique_name);

    if (!card) {
      throw new AppError('Card not found.');
    }

    return card;
  }
}

export default ShowEventCardService;
