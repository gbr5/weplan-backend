import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import EventOwner from '@modules/events/infra/typeorm/entities/EventOwner';
import IEventOwnersRepository from '@modules/events/repositories/IEventOwnersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
  user_id: string;
  event_id: string;
  owner_id: string;
  description: string;
}

@injectable()
class CreateEventOwnerService {
  constructor(
    @inject('EventOwnersRepository')
    private ownersRepository: IEventOwnersRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    event_id,
    owner_id,
    description,
  }: IRequest): Promise<EventOwner> {
    const ownerExists = await this.ownersRepository.findByEventAndOwnerId(
      event_id,
      owner_id,
    );

    if (ownerExists) {
      throw new AppError('The owner that you have chosen, already exists.');
    }

    const owner = await this.ownersRepository.create({
      event_id,
      owner_id,
      description,
    });

    await this.notificationsRepository.create({
      recipient_id: user_id,
      content: 'Cerimonialista adicionado com sucesso.',
    });

    return owner;
  }
}

export default CreateEventOwnerService;