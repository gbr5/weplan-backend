import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventTasksRepository from '@modules/events/repositories/IEventTasksRepository';
import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';

@injectable()
class DeleteEventTaskService {
  constructor(
    @inject('EventTasksRepository')
    private eventTasksRepository: IEventTasksRepository,

    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const eventTask = await this.eventTasksRepository.findById(id);

    if (!eventTask) {
      throw new AppError('Event date not found.');
    }

    await this.eventTasksRepository.delete(id);
    await this.tasksRepository.delete(eventTask.task);
  }
}

export default DeleteEventTaskService;
