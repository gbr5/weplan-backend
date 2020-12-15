import EventOwnerPayment from '@modules/transactions/infra/typeorm/entities/EventOwnerPayment';
import ICreateEventOwnerPaymentDTO from '@modules/transactions/dtos/ICreateEventOwnerPaymentDTO';

export default interface IEventOwnerPaymentsRepository {
  create(data: ICreateEventOwnerPaymentDTO): Promise<EventOwnerPayment>;
  findById(id: string): Promise<EventOwnerPayment | undefined>;
  findByEvent(event_id: string): Promise<EventOwnerPayment[]>;
  findByOwner(event_owner_id: string): Promise<EventOwnerPayment[]>;
  save(EventOwnerPayment: EventOwnerPayment): Promise<EventOwnerPayment>;
  delete(EventOwnerPayment: EventOwnerPayment): Promise<void>;
}
