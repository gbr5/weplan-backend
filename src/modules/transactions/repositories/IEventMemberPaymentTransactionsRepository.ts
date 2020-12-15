import EventMemberPaymentTransaction from '@modules/transactions/infra/typeorm/entities/EventMemberPaymentTransaction';
import ICreateEventMemberPaymentTransactionDTO from '@modules/transactions/dtos/ICreateEventMemberPaymentTransactionDTO';

export default interface IEventMemberPaymentTransactionsRepository {
  create(
    data: ICreateEventMemberPaymentTransactionDTO,
  ): Promise<EventMemberPaymentTransaction>;
  findById(id: string): Promise<EventMemberPaymentTransaction | undefined>;
  findByMemberPayment(
    payment_id: string,
  ): Promise<EventMemberPaymentTransaction[]>;
  save(
    EventMemberPaymentTransaction: EventMemberPaymentTransaction,
  ): Promise<EventMemberPaymentTransaction>;
  delete(
    EventMemberPaymentTransaction: EventMemberPaymentTransaction,
  ): Promise<void>;
}
