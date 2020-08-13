import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventCardsRepository from '@modules/suppliers/repositories/IEventCardsRepository';

interface IRequest {
  event_id: string;
  card_unique_name: string;
}
@injectable()
class DeleteEventCardService {
  constructor(
    @inject('EventCardsRepository')
    private eventCardsRepository: IEventCardsRepository,
  ) {}

  public async execute(card_unique_name: string): Promise<void> {
    const eventCardRelation = await this.eventCardsRepository.findByCard(
      card_unique_name,
    );

    if (!eventCardRelation) {
      throw new AppError('Event card relation not found.');
    }

    await this.eventCardsRepository.delete(eventCardRelation);
  }
}

export default DeleteEventCardService;
