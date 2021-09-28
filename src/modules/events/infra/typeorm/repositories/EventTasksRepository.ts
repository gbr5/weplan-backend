import { getRepository, Repository } from 'typeorm';

import IEventTasksRepository from '@modules/events/repositories/IEventTasksRepository';
import IFindAllEventTasksByIdsDTO from '@modules/events/dtos/IFindAllEventTasksByIdsDTO';

import EventTask from '@modules/events/infra/typeorm/entities/EventTask';
import ICreateEventTaskDTO from '@modules/events/dtos/ICreateEventTaskDTO';

class EventTasksRepository implements IEventTasksRepository {
  private ormRepository: Repository<EventTask>;

  constructor() {
    this.ormRepository = getRepository(EventTask);
  }

  public async findById(id: string): Promise<EventTask | undefined> {
    const findEventTask = await this.ormRepository.findOne(id);

    return findEventTask;
  }

  public async findByEventId(event_id: string): Promise<EventTask[]> {
    const findEventTask = await this.ormRepository.find({
      where: { event_id },
    });

    return findEventTask;
  }

  public async findAllByIds(
    ids: IFindAllEventTasksByIdsDTO[],
  ): Promise<EventTask[]> {
    const findEventTask = await this.ormRepository.findByIds(ids);

    return findEventTask;
  }

  public async create(data: ICreateEventTaskDTO): Promise<EventTask> {
    const event = this.ormRepository.create(data);

    await this.ormRepository.save(event);

    return event;
  }

  public async save(event: EventTask): Promise<EventTask> {
    return this.ormRepository.save(event);
  }

  public async delete(event_id: string): Promise<void> {
    await this.ormRepository.delete(event_id);
  }
}

export default EventTasksRepository;
