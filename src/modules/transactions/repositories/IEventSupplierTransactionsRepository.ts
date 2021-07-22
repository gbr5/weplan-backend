import EventSupplierTransaction from '@modules/transactions/infra/typeorm/entities/EventSupplierTransaction';
import ICreateEventSupplierTransactionDTO from '@modules/transactions/dtos/ICreateEventSupplierTransactionDTO';

export default interface IEventSupplierTransactionsRepository {
  create(
    data: ICreateEventSupplierTransactionDTO,
  ): Promise<EventSupplierTransaction>;
  findById(id: string): Promise<EventSupplierTransaction | undefined>;
  findByAgreementId(agreement_id: string): Promise<EventSupplierTransaction[]>;
  save(
    transaction: EventSupplierTransaction,
  ): Promise<EventSupplierTransaction>;
  delete(transaction: EventSupplierTransaction): Promise<void>;
}
