import CardOutsideParticipant from '@modules/suppliers/infra/typeorm/entities/CardOutsideParticipant';
import ICreateCardOutsideParticipantDTO from '@modules/suppliers/dtos/ICreateCardOutsideParticipantDTO';

export default interface ICardOutsideParticipantsRepository {
  create(
    data: ICreateCardOutsideParticipantDTO,
  ): Promise<CardOutsideParticipant>;
  findById(id: string): Promise<CardOutsideParticipant | undefined>;
  findByCard(card_unique_name: string): Promise<CardOutsideParticipant[]>;
  findByContactCard(
    contact_card_unique_name: string,
  ): Promise<CardOutsideParticipant[]>;
  findByCompanyContactId(
    company_contact_id: string,
  ): Promise<CardOutsideParticipant[]>;
  save(card: CardOutsideParticipant): Promise<CardOutsideParticipant>;
  delete(card: CardOutsideParticipant): Promise<void>;
}
