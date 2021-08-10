import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventSupplierNotesRepository from '../repositories/IEventSupplierNotesRepository';

@injectable()
class DeleteEventSupplierNoteService {
  constructor(
    @inject('EventSupplierNotesRepository')
    private eventSupplierNotesRepository: IEventSupplierNotesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const eventSupplierNote = await this.eventSupplierNotesRepository.findById(
      id,
    );

    if (!eventSupplierNote) {
      throw new AppError('Supplier note not found.');
    }

    await this.eventSupplierNotesRepository.delete(eventSupplierNote);
  }
}

export default DeleteEventSupplierNoteService;
