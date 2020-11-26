import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICardNotesRepository from '@modules/suppliers/repositories/ICardNotesRepository';

import CardNote from '@modules/suppliers/infra/typeorm/entities/CardNote';

@injectable()
class UpdateCardNoteService {
  constructor(
    @inject('CardNotesRepository')
    private cardNotesRepository: ICardNotesRepository,
  ) {}

  public async execute(id: string, note: string): Promise<CardNote> {
    console.log(id, note);

    const cardNote = await this.cardNotesRepository.findById(id);
    console.log(cardNote);

    if (!cardNote) {
      throw new AppError('CardNote not found.');
    }

    cardNote.note = note;

    const updatedCardNote = await this.cardNotesRepository.save(cardNote);
    console.log(updatedCardNote, 'esses');

    return updatedCardNote;
  }
}

export default UpdateCardNoteService;
