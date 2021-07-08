import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventTasksRepository from '@modules/events/repositories/IEventTasksRepository';
import EventTask from '../infra/typeorm/entities/EventTask';

@injectable()
class ListEventTasksService {
  constructor(
    @inject('EventTasksRepository')
    private eventTasksRepository: IEventTasksRepository,
  ) {}

  public async execute(event_id: string): Promise<EventTask[]> {
    const eventTasks = await this.eventTasksRepository.findByEventId(event_id);

    return eventTasks;
  }
}

export default ListEventTasksService;
