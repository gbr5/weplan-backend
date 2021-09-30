import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ITaskNotesRepository from '@modules/tasks/repositories/ITaskNotesRepository';
import TaskNote from '../infra/typeorm/entities/TaskNote';

@injectable()
class ListTaskNotesService {
  constructor(
    @inject('TaskNotesRepository')
    private tasksRepository: ITaskNotesRepository,
  ) {}

  public async execute(task_id: string): Promise<TaskNote[]> {
    const tasks = await this.tasksRepository.findByTaskId(task_id);

    return tasks;
  }
}

export default ListTaskNotesService;
