import { injectable, inject } from 'tsyringe';

import EventCard from '@modules/suppliers/infra/typeorm/entities/EventCard';
import IEventCardsRepository from '@modules/suppliers/repositories/IEventCardsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
  event_id: string;
  card_unique_name: string;
}

@injectable()
class CreateEventCardService {
  constructor(
    @inject('EventCardsRepository')
    private cardsRepository: IEventCardsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    event_id,
    card_unique_name,
  }: IRequest): Promise<EventCard> {
    // const cardExists = await this.cardsRepository.findByCard(card_unique_name);

    // if (cardExists) {
    //   throw new AppError(
    //     'The card event relation that you are trying to create, already exists.',
    //   );
    // }

    const card = await this.cardsRepository.create({
      event_id,
      card_unique_name,
    });

    return card;
  }
}

export default CreateEventCardService;
