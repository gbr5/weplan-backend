import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ITaskFollowersRepository from '@modules/tasks/repositories/ITaskFollowersRepository';
import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import Task from '@modules/tasks/infra/typeorm/entities/Task';

@injectable()
class ListTasksByUserService {
  constructor(
    @inject('TaskFollowersRepository')
    private taskFollowersRepository: ITaskFollowersRepository,

    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  public async execute(user_id: string): Promise<Task[]> {
    const taskFollowers = await this.taskFollowersRepository.findByUserId(
      user_id,
    );

    const ids = taskFollowers.map(task => {
      return {
        id: task.task_id,
      };
    });

    const tasks = await this.tasksRepository.findAllByIds(ids);

    return tasks;
  }
}

export default ListTasksByUserService;
