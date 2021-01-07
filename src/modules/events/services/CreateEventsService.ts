import { isBefore, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Event from '@modules/events/infra/typeorm/entities/Event';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import IEventOwnersRepository from '../repositories/IEventOwnersRepository';
import ICreateEventDTO from '../dtos/ICreateEventDTO';

@injectable()
class CreateEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,

    @inject('EventOwnersRepository')
    private eventOwnersRepository: IEventOwnersRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    trimmed_name,
    user_id,
    event_type,
    date,
    isDateDefined,
    isPublished,
  }: ICreateEventDTO): Promise<Event> {
    const eventDate = new Date(date);

    if (isBefore(eventDate, Date.now())) {
      throw new AppError("You can't create an event on a past date.");
    }

    const eventNameExists = await this.eventsRepository.findByName(name);

    if (eventNameExists) {
      throw new AppError(
        'The event name that you have chosen, already exists.',
      );
    }

    const event = await this.eventsRepository.create({
      name,
      trimmed_name,
      user_id,
      event_type,
      date: eventDate,
      isDateDefined,
      isPublished,
    });

    await this.eventOwnersRepository.create({
      event_id: event.id,
      description: 'Anfitrião Master',
      number_of_guests: 0,
      owner_id: user_id,
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
