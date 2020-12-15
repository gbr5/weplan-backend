import EventMemberPayment from '@modules/transactions/infra/typeorm/entities/EventMemberPayment';
import ICreateEventMemberPaymentDTO from '@modules/transactions/dtos/ICreateEventMemberPaymentDTO';

export default interface IEventMemberPaymentsRepository {
  create(data: ICreateEventMemberPaymentDTO): Promise<EventMemberPayment>;
  findById(id: string): Promise<EventMemberPayment | undefined>;
  findByMember(event_member_id: string): Promise<EventMemberPayment[]>;
  findByEvent(event_id: string): Promise<EventMemberPayment[]>;
  save(EventMemberPayment: EventMemberPayment): Promise<EventMemberPayment>;
  delete(EventMemberPayment: EventMemberPayment): Promise<void>;
}
