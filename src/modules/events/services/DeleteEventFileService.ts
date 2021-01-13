import { injectable, inject } from 'tsyringe';

import IEventFilesRepository from '@modules/events/repositories/IEventFilesRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class DeleteEventFileService {
  constructor(
    @inject('EventFilesRepository')
    private eventFilesRepository: IEventFilesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const eventFile = await this.eventFilesRepository.findById(id);

    if (!eventFile) {
      throw new AppError('Event file not found.');
    }

    await this.eventFilesRepository.delete(eventFile);
  }
}

export default DeleteEventFileService;
