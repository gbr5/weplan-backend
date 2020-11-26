import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICardNotesRepository from '@modules/suppliers/repositories/ICardNotesRepository';

@injectable()
class DeleteCardNoteService {
  constructor(
    @inject('CardNotesRepository')
    private cardNotesRepository: ICardNotesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const cardNote = await this.cardNotesRepository.findById(id);
    console.log('delete', id, cardNote);

    if (!cardNote) {
      throw new AppError('Event card relation not found.');
    }

    await this.cardNotesRepository.delete(cardNote);
  }
}

export default DeleteCardNoteService;
