import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventTaskNotesRepository from '@modules/events/repositories/IEventTaskNotesRepository';
import EventTaskNote from '../infra/typeorm/entities/EventTaskNote';

@injectable()
class ListEventTaskNotesService {
  constructor(
    @inject('EventTaskNotesRepository')
    private eventTasksRepository: IEventTaskNotesRepository,
  ) {}

  public async execute(event_id: string): Promise<EventTaskNote[]> {
    const eventTasks = await this.eventTasksRepository.findByTaskId(event_id);

    return eventTasks;
  }
}

export default ListEventTaskNotesService;
