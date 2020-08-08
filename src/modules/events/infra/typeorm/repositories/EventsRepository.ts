import { getRepository, Repository } from 'typeorm';
// Falta fazer um findAllEventsByTypeFromProvider
// Falta fazer um findAllEventsFromProvider
// Falta fazer um findAllEventsInYearFromProvider
// Falta fazer um findAllEventsInMonthFromProvider
// Falta fazer um findAllEventsInDayFromProvider

import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import ICreateEventDTO from '@modules/events/dtos/ICreateEventDTO';

import Event from '@modules/events/infra/typeorm/entities/Event';

class EventsRepository implements IEventsRepository {
  private ormRepository: Repository<Event>;

  constructor() {
    this.ormRepository = getRepository(Event);
  }

  public async findByDate(
    date: Date,
    user_id: string,
  ): Promise<Event | undefined> {
    const findEvent = await this.ormRepository.findOne({
      where: { date, user_id },
    });

    return findEvent;
  }

  public async findByName(trimmed_name: string): Promise<Event | undefined> {
    const findEvent = await this.ormRepository.findOne({
      where: { trimmed_name },
    });

    return findEvent;
  }

  public async findByUserId(user_id: string): Promise<Event[]> {
    const findEvent = await this.ormRepository.find({
      where: { user_id },
    });

    return findEvent;
  }

  public async create(userData: ICreateEventDTO): Promise<Event> {
    const event = this.ormRepository.create(userData);

    await this.ormRepository.save(event);

    return event;
  }

  public async save(event: Event): Promise<Event> {
    return this.ormRepository.save(event);
  }
}

export default EventsRepository;
