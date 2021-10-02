import EventMemberTransaction from '@modules/transactions/infra/typeorm/entities/EventMemberTransaction';
import ICreateEventMemberTransactionDTO from '@modules/transactions/dtos/ICreateEventMemberTransactionDTO';

export default interface IEventMemberTransactionsRepository {
  create(
    data: ICreateEventMemberTransactionDTO,
  ): Promise<EventMemberTransaction>;
  findById(id: string): Promise<EventMemberTransaction | undefined>;
  findByAgreementId(agreement_id: string): Promise<EventMemberTransaction[]>;
  save(transaction: EventMemberTransaction): Promise<EventMemberTransaction>;
  delete(transaction: EventMemberTransaction): Promise<void>;
}
