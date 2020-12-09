import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventUserSupplierNotesRepository from '@modules/events/repositories/IEventUserSupplierNotesRepository';

@injectable()
class DeleteEventUserSupplierNoteService {
  constructor(
    @inject('EventUserSupplierNotesRepository')
    private eventUserSupplierNotesRepository: IEventUserSupplierNotesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const eventUserSupplierNote = await this.eventUserSupplierNotesRepository.findById(
      id,
    );

    if (!eventUserSupplierNote) {
      throw new AppError('Event note not found.');
    }

    await this.eventUserSupplierNotesRepository.delete(eventUserSupplierNote);
  }
}

export default DeleteEventUserSupplierNoteService;
