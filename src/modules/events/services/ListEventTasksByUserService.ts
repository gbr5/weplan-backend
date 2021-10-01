import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventTasksRepository from '@modules/events/repositories/IEventTasksRepository';
import EventTask from '@modules/events/infra/typeorm/entities/EventTask';

interface IRequest {
  user_id: string;
  event_id: string;
}

@injectable()
class ListEventTasksByUserService {
  constructor(
    @inject('EventTasksRepository')
    private eventTasksRepository: IEventTasksRepository,
  ) {}

  public async execute({ event_id, user_id }: IRequest): Promise<EventTask[]> {
    const eventTasks = await this.eventTasksRepository.findByEventId(event_id);
    const taskFollowers: EventTask[] = [];

    eventTasks.map(task => {
      task.task.followers.map(({ follower }) => {
        if (follower.id === user_id) return taskFollowers.push(task);
        return follower;
      });
      return task;
    });

    return taskFollowers;
  }
}

export default ListEventTasksByUserService;
