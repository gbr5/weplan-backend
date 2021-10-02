import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventOwnerNotesRepository from '../repositories/IEventOwnerNotesRepository';

@injectable()
class DeleteEventOwnerNoteService {
  constructor(
    @inject('EventOwnerNotesRepository')
    private eventOwnerNotesRepository: IEventOwnerNotesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const eventOwnerNote = await this.eventOwnerNotesRepository.findById(id);

    if (!eventOwnerNote) {
      throw new AppError('Owner note not found.');
    }

    await this.eventOwnerNotesRepository.delete(eventOwnerNote);
  }
}

export default DeleteEventOwnerNoteService;
