import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventTaskNotesRepository from '@modules/events/repositories/IEventTaskNotesRepository';

@injectable()
class DeleteEventTaskNoteService {
  constructor(
    @inject('EventTaskNotesRepository')
    private eventTaskNotesRepository: IEventTaskNotesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const eventTaskNote = await this.eventTaskNotesRepository.findById(id);

    if (!eventTaskNote) {
      throw new AppError('Event date not found.');
    }

    await this.eventTaskNotesRepository.delete(id);
  }
}

export default DeleteEventTaskNoteService;
