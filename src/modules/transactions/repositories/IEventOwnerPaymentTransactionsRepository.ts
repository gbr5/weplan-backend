import EventOwnerPaymentTransaction from '@modules/transactions/infra/typeorm/entities/EventOwnerPaymentTransaction';
import ICreateEventOwnerPaymentTransactionDTO from '@modules/transactions/dtos/ICreateEventOwnerPaymentTransactionDTO';

export default interface IEventOwnerPaymentTransactionsRepository {
  create(
    data: ICreateEventOwnerPaymentTransactionDTO,
  ): Promise<EventOwnerPaymentTransaction>;
  findById(id: string): Promise<EventOwnerPaymentTransaction | undefined>;
  findByOwnerPayment(
    payment_id: string,
  ): Promise<EventOwnerPaymentTransaction[]>;
  save(
    EventOwnerPaymentTransaction: EventOwnerPaymentTransaction,
  ): Promise<EventOwnerPaymentTransaction>;
  delete(
    EventOwnerPaymentTransaction: EventOwnerPaymentTransaction,
  ): Promise<void>;
}
