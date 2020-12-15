import EventSupplierMainTransaction from '@modules/transactions/infra/typeorm/entities/EventSupplierMainTransaction';
import ICreateEventSupplierMainTransactionDTO from '@modules/transactions/dtos/ICreateEventSupplierMainTransactionDTO';

export default interface IEventSupplierMainTransactionsRepository {
  create(
    data: ICreateEventSupplierMainTransactionDTO,
  ): Promise<EventSupplierMainTransaction>;
  findById(id: string): Promise<EventSupplierMainTransaction | undefined>;
  findByAgreementTransaction(
    agreement_transaction_id: string,
  ): Promise<EventSupplierMainTransaction[]>;
  save(
    EventSupplierMainTransaction: EventSupplierMainTransaction,
  ): Promise<EventSupplierMainTransaction>;
  delete(
    EventSupplierMainTransaction: EventSupplierMainTransaction,
  ): Promise<void>;
}
