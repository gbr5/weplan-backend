import CardParticipant from '@modules/suppliers/infra/typeorm/entities/CardParticipant';
import ICreateCardParticipantDTO from '@modules/suppliers/dtos/ICreateCardParticipantDTO';

export default interface ICardParticipantsRepository {
  create(data: ICreateCardParticipantDTO): Promise<CardParticipant>;
  findById(id: string): Promise<CardParticipant | undefined>;
  findByCard(card_unique_name: string): Promise<CardParticipant[]>;
  findByUserId(user_id: string): Promise<CardParticipant[]>;
  findByUserIdAndCardUniqueName(
    data: ICreateCardParticipantDTO,
  ): Promise<CardParticipant | undefined>;
  save(card: CardParticipant): Promise<CardParticipant>;
  delete(card: CardParticipant): Promise<void>;
}
