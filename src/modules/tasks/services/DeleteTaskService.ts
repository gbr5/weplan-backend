import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITasksRepository from '../repositories/ITasksRepository';

@injectable()
class DeleteTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new AppError('Supplier note not found.');
    }

    await this.tasksRepository.delete(task);
  }
}

export default DeleteTaskService;
