import { getRepository, Repository } from 'typeorm';

import IEventDatesRepository from '@modules/events/repositories/IEventDatesRepository';

import EventDate from '@modules/events/infra/typeorm/entities/EventDate';
import ICreateEventDateDTO from '@modules/events/dtos/IEventDateDTO';

class EventDatesRepository implements IEventDatesRepository {
  private ormRepository: Repository<EventDate>;

  constructor() {
    this.ormRepository = getRepository(EventDate);
  }

  public async findById(id: string): Promise<EventDate | undefined> {
    const findEventDate = await this.ormRepository.findOne(id);

    return findEventDate;
  }

  public async findByEventId(event_id: string): Promise<EventDate[]> {
    const findEventDate = await this.ormRepository.find({
      where: { event_id },
    });

    return findEventDate;
  }

  public async create(data: ICreateEventDateDTO): Promise<EventDate> {
    const event = this.ormRepository.create(data);

    await this.ormRepository.save(event);

    return event;
  }

  public async save(event: EventDate): Promise<EventDate> {
    return this.ormRepository.save(event);
  }

  public async delete(event_id: string): Promise<void> {
    await this.ormRepository.delete(event_id);
  }
}

export default EventDatesRepository;
