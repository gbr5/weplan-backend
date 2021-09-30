import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import Task from '@modules/tasks/infra/typeorm/entities/Task';
import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';

@injectable()
class ListUserTasksService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  public async execute(user_id: string): Promise<Task[]> {
    const tasks = await this.tasksRepository.findByUserId(user_id);

    const sortedTasks = tasks.sort((a, b) => {
      if (new Date(a.due_date) > new Date(b.due_date)) return 1;
      if (new Date(a.due_date) < new Date(b.due_date)) return -1;
      return 0;
    });

    return sortedTasks;
  }
}

export default ListUserTasksService;
