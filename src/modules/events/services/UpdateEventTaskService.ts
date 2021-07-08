import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventTasksRepository from '@modules/events/repositories/IEventTasksRepository';

import EventTask from '@modules/events/infra/typeorm/entities/EventTask';

interface IRequest {
  id: string;
  title: string;
  priority: 'low' | 'neutral' | 'high';
  status: 'not started' | 'running' | 'finnished';
  due_date: Date;
}
@injectable()
class UpdateEventTaskService {
  constructor(
    @inject('EventTasksRepository')
    private eventTasksRepository: IEventTasksRepository,
  ) {}

  public async execute({
    id,
    priority,
    status,
    title,
    due_date,
  }: IRequest): Promise<EventTask> {
    const eventTask = await this.eventTasksRepository.findById(id);

    if (!eventTask) {
      throw new AppError('EventTask not found.');
    }
    eventTask.due_date = due_date;
    eventTask.priority = priority;
    eventTask.status = status;
    eventTask.title = title;

    const updatedEventTask = await this.eventTasksRepository.save(eventTask);

    return updatedEventTask;
  }
}

export default UpdateEventTaskService;
