import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventDatesRepository from '@modules/events/repositories/IEventDatesRepository';

import EventDate from '@modules/events/infra/typeorm/entities/EventDate';

interface IRequest {
  id: string;
  date: Date;
}
@injectable()
class UpdateEventDateService {
  constructor(
    @inject('EventDatesRepository')
    private eventDatesRepository: IEventDatesRepository,
  ) {}

  public async execute({ id, date }: IRequest): Promise<EventDate> {
    const eventDate = await this.eventDatesRepository.findById(id);

    if (!eventDate) {
      throw new AppError('EventDate not found.');
    }
    eventDate.date = date;

    const updatedEventDate = await this.eventDatesRepository.save(eventDate);

    return updatedEventDate;
  }
}

export default UpdateEventDateService;
