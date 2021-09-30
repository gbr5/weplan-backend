import { injectable, inject } from 'tsyringe';

import ITasksRepository from '../repositories/ITasksRepository';
import Task from '../infra/typeorm/entities/Task';

interface IRequest {
  id: string;
  title: string;
  priority: string;
  status: string;
  due_date: Date;
}

@injectable()
class UpdateTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  public async execute({
    id,
    due_date,
    priority,
    status,
    title,
  }: IRequest): Promise<Task> {
    const updatedTask = await this.tasksRepository.findById(id);

    if (!updatedTask) throw new Error('Task not found!');

    updatedTask.title = title;
    updatedTask.priority = priority;
    updatedTask.status = status;
    updatedTask.due_date = due_date;

    await this.tasksRepository.save(updatedTask);

    return updatedTask;
  }
}

export default UpdateTaskService;
