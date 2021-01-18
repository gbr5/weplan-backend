import { injectable, inject } from 'tsyringe';

import EventDate from '@modules/events/infra/typeorm/entities/EventDate';
import IEventDatesRepository from '@modules/events/repositories/IEventDatesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import AppError from '@shared/errors/AppError';
import { differenceInDays, parseISO } from 'date-fns';
import ICreateEventDatesDTO from '../dtos/ICreateEventDatesDTO';
import IEventsRepository from '../repositories/IEventsRepository';

@injectable()
class CreateEventDateService {
  constructor(
    @inject('EventDatesRepository')
    private eventDatesRepository: IEventDatesRepository,

    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    event_id,
    dates,
  }: ICreateEventDatesDTO): Promise<EventDate[]> {
    const event = await this.eventsRepository.findById(event_id);

    if (!event) {
      throw new AppError('Event not found.');
    }

    const notAlreadySelectedDates: Date[] = [];
    dates.map(date => {
      const alreadySelectedDate = event.eventDates.find(
        eDate => differenceInDays(eDate.date, parseISO(String(date))) === 0,
      );
      if (!alreadySelectedDate) {
        notAlreadySelectedDates.push(date);
      }
      return date;
    });
    if (notAlreadySelectedDates.length <= 0) {
      throw new AppError('All dates are already selected.');
    }

    const createdDates = await Promise.all([
      notAlreadySelectedDates.map(date => {
        return this.eventDatesRepository.create({
          event_id,
          date,
        });
      }),
    ]);

    const eventDates: EventDate[] = [];

    createdDates.map(date => {
      date.map(xDate => {
        xDate.then(response => {
          eventDates.push(response);
        });
        return xDate;
      });
      return date;
    });

    return eventDates;
  }
}

export default CreateEventDateService;
