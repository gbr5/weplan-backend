import { startOfHour, isBefore, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Event from '@modules/events/infra/typeorm/entities/Event';
import IEventRepository from '@modules/events/repositories/IEventsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
  name: string;
  user_id: string;
  event_type: string;
  date: Date;
}

@injectable()
class CreateEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    user_id,
    event_type,
    date,
  }: IRequest): Promise<Event> {
    const eventDate = startOfHour(date);

    if (isBefore(eventDate, Date.now())) {
      throw new AppError("You can't create an event on a past date.");
    }

    const eventNameExists = await this.eventsRepository.findByName(name);

    if (eventNameExists) {
      throw new AppError(
        'The event name that you have chosen, already exists.',
      );
    }

    const eventName = name
      .toLowerCase()
      .split(' ')
      .map(word => {
        return word[0].toUpperCase() + word.slice(1);
      })
      .join(' ');

    const trimmed_name = name
      .toLowerCase()
      .split(' ')
      .map(word => {
        return word[0].toUpperCase() + word.slice(1);
      })
      .join('');

    const event = await this.eventsRepository.create({
      name: eventName,
      trimmed_name,
      user_id,
      event_type,
      date: eventDate,
    });

    const dateFormatted = format(eventDate, "dd/MM/yyyy 'às' HH:mm 'horas");

    await this.notificationsRepository.create({
      recipient_id: user_id,
      content: `Seu evento ${name} no dia ${dateFormatted} foi criado`,
    });

    await this.cacheProvider.invalidate(
      `user-events:${user_id}:${format(eventDate, 'yyyy-M-d')}`,
    );

    return event;
  }
}

export default CreateEventService;
