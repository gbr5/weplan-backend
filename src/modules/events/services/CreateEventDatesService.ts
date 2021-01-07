import { injectable, inject } from 'tsyringe';

import EventDate from '@modules/events/infra/typeorm/entities/EventDate';
import IEventDatesRepository from '@modules/events/repositories/IEventDatesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateEventDatesDTO from '../dtos/ICreateEventDatesDTO';

@injectable()
class CreateEventDateService {
  constructor(
    @inject('EventDatesRepository')
    private eventDatesRepository: IEventDatesRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    event_id,
    dates,
  }: ICreateEventDatesDTO): Promise<EventDate[]> {
    const createdDates = await Promise.all([
      dates.map(date => {
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
