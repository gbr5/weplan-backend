import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventNotesRepository from '@modules/events/repositories/IEventNotesRepository';

@injectable()
class DeleteEventNoteService {
  constructor(
    @inject('EventNotesRepository')
    private eventNotesRepository: IEventNotesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const eventNote = await this.eventNotesRepository.findById(id);

    if (!eventNote) {
      throw new AppError('Event note not found.');
    }

    await this.eventNotesRepository.delete(eventNote.id);
  }
}

export default DeleteEventNoteService;
