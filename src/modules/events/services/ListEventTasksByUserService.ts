import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ITaskFollowersRepository from '@modules/tasks/repositories/ITaskFollowersRepository';
import IEventTasksRepository from '../repositories/IEventTasksRepository';
import EventTask from '../infra/typeorm/entities/EventTask';

@injectable()
class ListEventTasksByUserService {
  constructor(
    @inject('TaskFollowersRepository')
    private taskFollowersRepository: ITaskFollowersRepository,

    @inject('EventTasksRepository')
    private eventTasksRepository: IEventTasksRepository,
  ) {}

  public async execute(user_id: string): Promise<EventTask[]> {
    const eventTaskFollowers = await this.taskFollowersRepository.findByUserId(
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
