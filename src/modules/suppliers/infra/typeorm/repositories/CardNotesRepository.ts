import { getRepository, Repository } from 'typeorm';

import ICardNotesRepository from '@modules/suppliers/repositories/ICardNotesRepository';
import ICreateCardNoteDTO from '@modules/suppliers/dtos/ICreateCardNoteDTO';
import CardNote from '@modules/suppliers/infra/typeorm/entities/CardNote';

class CardNotesRepository implements ICardNotesRepository {
  private ormRepository: Repository<CardNote>;

  constructor() {
    this.ormRepository = getRepository(CardNote);
  }

  public async findByCard(card_unique_name: string): Promise<CardNote[]> {
    const findCardNotes = await this.ormRepository.find({
      where: { card_unique_name },
    });

    return findCardNotes;
  }

  public async findByUserId(user_id: string): Promise<CardNote[]> {
    const findCardNotes = await this.ormRepository.find({
      where: { user_id },
    });

    return findCardNotes;
  }

  public async findById(id: string): Promise<CardNote | undefined> {
    const findCardNote = await this.ormRepository.findOne(id);

    return findCardNote;
  }

  public async create({
    user_id,
    card_unique_name,
    note,
  }: ICreateCardNoteDTO): Promise<CardNote> {
    const card = this.ormRepository.create({
      user_id,
      card_unique_name,
      note,
    });

    await this.ormRepository.save(card);

    return card;
  }

  public async save(card: CardNote): Promise<CardNote> {
    return this.ormRepository.save(card);
  }

  public async delete({ id }: CardNote): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }
}

export default CardNotesRepository;
