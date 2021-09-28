import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventTaskFollowersRepository from '@modules/events/repositories/IEventTaskFollowersRepository';
import IEventTasksRepository from '../repositories/IEventTasksRepository';
import EventTask from '../infra/typeorm/entities/EventTask';

@injectable()
class ListEventTasksByUserService {
  constructor(
    @inject('EventTaskFollowersRepository')
    private eventTaskFollowersRepository: IEventTaskFollowersRepository,

    @inject('EventTasksRepository')
    private eventTasksRepository: IEventTasksRepository,
  ) {}

  public async execute(user_id: string): Promise<EventTask[]> {
    const eventTaskFollowers = await this.eventTaskFollowersRepository.findByUserId(
      user_id,
    );

    const ids = eventTaskFollowers.map(task => {
      return {
        id: task.task_id,
      };
    });

    const eventTasks = await this.eventTasksRepository.findAllByIds(ids);

    return eventTasks;
  }
}

export default ListEventTasksByUserService;
