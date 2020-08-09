import { getRepository, Repository } from 'typeorm';

import IEventTypesRepository from '@modules/events/repositories/IEventTypesRepository';
import ICreateEventTypeDTO from '@modules/events/dtos/ICreateEventTypeDTO';

import EventType from '@modules/events/infra/typeorm/entities/EventType';

class EventTypesRepository implements IEventTypesRepository {
  private ormRepository: Repository<EventType>;

  constructor() {
    this.ormRepository = getRepository(EventType);
  }

  public async findByName(name: string): Promise<EventType | undefined> {
    const findEventType = await this.ormRepository.findOne({
      where: { name },
    });

    return findEventType;
  }

  public async findAll(): Promise<EventType[]> {
    const findEventTypes = await this.ormRepository.find();
    console.log(findEventTypes, 'teste - EventType get all with find()');

    return findEventTypes;
  }

  public async create(userData: ICreateEventTypeDTO): Promise<EventType> {
    const eventType = this.ormRepository.create(userData);

    await this.ormRepository.save(eventType);

    return eventType;
  }

  public async save(eventType: EventType): Promise<EventType> {
    return this.ormRepository.save(eventType);
  }
}

export default EventTypesRepository;
