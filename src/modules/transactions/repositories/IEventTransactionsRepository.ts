import EventTransaction from '@modules/transactions/infra/typeorm/entities/EventTransaction';
import ICreateEventTransactionDTO from '@modules/transactions/dtos/ICreateEventTransactionDTO';

export default interface IEventTransactionsRepository {
  create(data: ICreateEventTransactionDTO): Promise<EventTransaction>;
  findById(id: string): Promise<EventTransaction | undefined>;
  findByEvent(event_id: string): Promise<EventTransaction[]>;
  save(EventTransaction: EventTransaction): Promise<EventTransaction>;
  delete(EventTransaction: EventTransaction): Promise<void>;
}
