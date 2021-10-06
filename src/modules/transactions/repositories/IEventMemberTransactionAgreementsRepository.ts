import EventMemberTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventMemberTransactionAgreement';
import ICreateEventMemberTransactionAgreementDTO from '@modules/transactions/dtos/ICreateEventMemberTransactionAgreementDTO';
import IFindAllByIds from '@modules/events/dtos/IFindAllEventTasksByIdsDTO';

export default interface IEventMemberTransactionAgreementsRepository {
  create(
    data: ICreateEventMemberTransactionAgreementDTO,
  ): Promise<EventMemberTransactionAgreement>;
  findById(id: string): Promise<EventMemberTransactionAgreement | undefined>;
  findByAllId(ids: IFindAllByIds[]): Promise<EventMemberTransactionAgreement[]>;
  findByMemberId(member_id: string): Promise<EventMemberTransactionAgreement[]>;
  save(
    data: EventMemberTransactionAgreement,
  ): Promise<EventMemberTransactionAgreement>;
  delete(data: EventMemberTransactionAgreement): Promise<void>;
}
