import { getRepository, Repository } from 'typeorm';

import IEventTaskFollowersRepository from '@modules/events/repositories/IEventTaskFollowersRepository';

import EventTaskFollower from '@modules/events/infra/typeorm/entities/EventTaskFollower';
import ICreateEventTaskFollowerDTO from '@modules/events/dtos/ICreateEventTaskFollowerDTO';

class EventTaskFollowersRepository implements IEventTaskFollowersRepository {
  private ormRepository: Repository<EventTaskFollower>;

  constructor() {
    this.ormRepository = getRepository(EventTaskFollower);
  }

  public async findById(id: string): Promise<EventTaskFollower | undefined> {
    const findEventTaskFollower = await this.ormRepository.findOne(id);

    return findEventTaskFollower;
  }

  public async findByTaskId(task_id: string): Promise<EventTaskFollower[]> {
    const findEventTaskFollower = await this.ormRepository.find({
      where: { task_id },
    });

    return findEventTaskFollower;
  }

  public async findByUserId(user_id: string): Promise<EventTaskFollower[]> {
    const findEventTaskFollower = await this.ormRepository.find({
      where: { user_id },
    });

    return findEventTaskFollower;
  }

  public async create(
    data: ICreateEventTaskFollowerDTO,
  ): Promise<EventTaskFollower> {
    const event = this.ormRepository.create(data);

    await this.ormRepository.save(event);

    return event;
  }

  public async save(event: EventTaskFollower): Promise<EventTaskFollower> {
    return this.ormRepository.save(event);
  }

  public async delete(event_id: string): Promise<void> {
    await this.ormRepository.delete(event_id);
  }
}

export default EventTaskFollowersRepository;
