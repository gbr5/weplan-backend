import { getRepository, Repository } from 'typeorm';

import IEventInfosRepository from '@modules/events/repositories/IEventInfosRepository';
import ICreateEventInfoDTO from '@modules/events/dtos/ICreateEventInfoDTO';
import EventInfo from '@modules/events/infra/typeorm/entities/EventInfo';

class EventInfosRepository implements IEventInfosRepository {
  private ormRepository: Repository<EventInfo>;

  constructor() {
    this.ormRepository = getRepository(EventInfo);
  }

  public async findByEvent(event_id: string): Promise<EventInfo | undefined> {
    console.log('event_id', event_id);
    const findEventInfo = await this.ormRepository.findOne({
      where: { event_id },
    });
    console.log('event_info', findEventInfo);

    return findEventInfo;
  }

  public async create(data: ICreateEventInfoDTO): Promise<EventInfo> {
    const eventInfo = this.ormRepository.create(data);

    await this.ormRepository.save(eventInfo);

    return eventInfo;
  }

  public async save(eventInfo: EventInfo): Promise<EventInfo> {
    return this.ormRepository.save(eventInfo);
  }
}

export default EventInfosRepository;
