import { getRepository, Repository } from 'typeorm';

import IEventsRepository from '@modules/events/repositories/IEventsRepository';

import Event from '@modules/events/infra/typeorm/entities/Event';
// import ICreateEventDTO from '@modules/events/dtos/ICreateEventDTO';

interface IRequest {
  name: string;
  trimmed_name: string;
  user_id: string;
  event_type: string;
  date: Date;
}

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

  public async findById(event_id: string): Promise<Event | undefined> {
    const id = event_id;
    const findEvent = await this.ormRepository.findOne(id);
    console.log(findEvent);

    return findEvent;
  }

  public async findByName(name: string): Promise<Event | undefined> {
    const findEvent = await this.ormRepository.findOne({
      where: { name },
    });

    return findEvent;
  }

  public async findByUserId(user_id: string): Promise<Event[]> {
    const findEvent = await this.ormRepository.find({
      where: { user_id },
    });

    return findEvent;
  }

  public async create({
    name,
    trimmed_name,
    event_type,
    user_id,
    date,
  }: IRequest): Promise<Event> {
    const event = await this.ormRepository.create({
      trimmed_name,
      name,
      event_type,
      user_id,
      date,
    });

    await this.ormRepository.save(event);

    return event;
  }

  public async save(event: Event): Promise<Event> {
    return this.ormRepository.save(event);
  }

  public async delete(event_id: string): Promise<void> {
    await this.ormRepository.delete(event_id);
  }
}

export default EventsRepository;
