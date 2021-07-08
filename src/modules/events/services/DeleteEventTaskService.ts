import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventTasksRepository from '@modules/events/repositories/IEventTasksRepository';

@injectable()
class DeleteEventTaskService {
  constructor(
    @inject('EventTasksRepository')
    private eventTasksRepository: IEventTasksRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const eventTask = await this.eventTasksRepository.findById(id);

    if (!eventTask) {
      throw new AppError('Event date not found.');
    }

    await this.eventTasksRepository.delete(id);
  }
}

export default DeleteEventTaskService;
