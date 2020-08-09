import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import EventType from '@modules/events/infra/typeorm/entities/EventType';
import IEventTypesRepository from '@modules/events/repositories/IEventTypesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
  name: string;
}

@injectable()
class CreateEventTypesService {
  constructor(
    @inject('EventTypesRepository')
    private eventTypesRepository: IEventTypesRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name }: IRequest): Promise<EventType> {
    const eventNameExists = await this.eventTypesRepository.findByName(name);

    if (eventNameExists) {
      throw new AppError(
        'The event type that you have chosen, already exists.',
      );
    }

    const eventType = await this.eventTypesRepository.create({
      name,
    });

    return eventType;
  }
}

export default CreateEventTypesService;
