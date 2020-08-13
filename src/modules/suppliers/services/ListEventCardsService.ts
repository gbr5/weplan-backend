import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventCardsRepository from '@modules/suppliers/repositories/IEventCardsRepository';

import EventCard from '@modules/suppliers/infra/typeorm/entities/EventCard';

@injectable()
class ListEventCardService {
  constructor(
    @inject('EventCardsRepository')
    private eventCardsRepository: IEventCardsRepository,
  ) {}

  public async execute(event_id: string): Promise<EventCard[]> {
    const event = await this.eventCardsRepository.findByEvent(event_id);

    if (!event) {
      throw new AppError('Card not found.');
    }

    return event;
  }
}

export default ListEventCardService;
