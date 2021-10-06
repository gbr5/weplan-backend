import EventOwnerTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventOwnerTransactionAgreement';
import ICreateEventOwnerTransactionAgreementDTO from '@modules/transactions/dtos/ICreateEventOwnerTransactionAgreementDTO';
import IFindAllByIds from '@modules/events/dtos/IFindAllEventTasksByIdsDTO';

export default interface IEventOwnerTransactionAgreementsRepository {
  create(
    data: ICreateEventOwnerTransactionAgreementDTO,
  ): Promise<EventOwnerTransactionAgreement>;
  findById(id: string): Promise<EventOwnerTransactionAgreement | undefined>;
  findByAllId(ids: IFindAllByIds[]): Promise<EventOwnerTransactionAgreement[]>;
  findByOwnerId(owner_id: string): Promise<EventOwnerTransactionAgreement[]>;
  save(
    data: EventOwnerTransactionAgreement,
  ): Promise<EventOwnerTransactionAgreement>;
  delete(data: EventOwnerTransactionAgreement): Promise<void>;
}
