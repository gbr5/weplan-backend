import { injectable, inject } from 'tsyringe';

import EventBudget from '@modules/events/infra/typeorm/entities/EventBudget';
import IEventBudgetRepository from '@modules/events/repositories/IEventBudgetRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import AppError from '@shared/errors/AppError';
import ICreateEventBudgetDTO from '../dtos/ICreateEventBudgetDTO';
import IEventsRepository from '../repositories/IEventsRepository';

@injectable()
class CreateEventBudgetService {
  constructor(
    @inject('EventBudgetRepository')
    private eventBudgetRepository: IEventBudgetRepository,

    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    event_id,
    budget,
  }: ICreateEventBudgetDTO): Promise<EventBudget> {
    const event = await this.eventsRepository.findById(event_id);

    if (!event) {
      throw new AppError('Event not found.');
    }

    const eventBudget = await this.eventBudgetRepository.create({
      budget,
      event_id,
    });

    return eventBudget;
  }
}

export default CreateEventBudgetService;
