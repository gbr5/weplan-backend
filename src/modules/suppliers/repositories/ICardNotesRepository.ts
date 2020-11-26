import CardNote from '@modules/suppliers/infra/typeorm/entities/CardNote';
import ICreateCardNoteDTO from '@modules/suppliers/dtos/ICreateCardNoteDTO';

export default interface ICardNotesRepository {
  create(data: ICreateCardNoteDTO): Promise<CardNote>;
  findById(id: string): Promise<CardNote | undefined>;
  findByCard(card_unique_name: string): Promise<CardNote[]>;
  findByUserId(user_id: string): Promise<CardNote[]>;
  save(card: CardNote): Promise<CardNote>;
  delete(card: CardNote): Promise<void>;
}
