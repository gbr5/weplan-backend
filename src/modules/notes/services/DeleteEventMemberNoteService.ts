import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventMemberNotesRepository from '../repositories/IEventMemberNotesRepository';

@injectable()
class DeleteEventMemberNoteService {
  constructor(
    @inject('EventMemberNotesRepository')
    private eventMemberNotesRepository: IEventMemberNotesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const eventMemberNote = await this.eventMemberNotesRepository.findById(id);

    if (!eventMemberNote) {
      throw new AppError('Member note not found.');
    }

    await this.eventMemberNotesRepository.delete(eventMemberNote);
  }
}

export default DeleteEventMemberNoteService;
