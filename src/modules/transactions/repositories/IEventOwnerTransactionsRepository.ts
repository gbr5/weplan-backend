import EventOwnerTransaction from '@modules/transactions/infra/typeorm/entities/EventOwnerTransaction';
import ICreateEventOwnerTransactionDTO from '@modules/transactions/dtos/ICreateEventOwnerTransactionDTO';

export default interface IEventOwnerTransactionsRepository {
  create(data: ICreateEventOwnerTransactionDTO): Promise<EventOwnerTransaction>;
  findById(id: string): Promise<EventOwnerTransaction | undefined>;
  findByAgreementId(agreement_id: string): Promise<EventOwnerTransaction[]>;
  save(transaction: EventOwnerTransaction): Promise<EventOwnerTransaction>;
  delete(transaction: EventOwnerTransaction): Promise<void>;
}
