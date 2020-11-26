import { injectable, inject } from 'tsyringe';

import ICardNotesRepository from '@modules/suppliers/repositories/ICardNotesRepository';

import CardNote from '@modules/suppliers/infra/typeorm/entities/CardNote';

@injectable()
class ListCardNotesService {
  constructor(
    @inject('CardNotesRepository')
    private cardNotesRepository: ICardNotesRepository,
  ) {}

  public async execute(card_unique_name: string): Promise<CardNote[]> {
    const notes = await this.cardNotesRepository.findByCard(card_unique_name);

    return notes;
  }
}

export default ListCardNotesService;
