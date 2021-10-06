import EventMemberMonthlyPaymentAgreement from '@modules/events/infra/typeorm/entities/EventMemberMonthlyPaymentAgreement';
import ICreateEventMemberMonthlyPaymentAgreementDTO from '@modules/events/dtos/ICreateEventMemberMonthlyPaymentAgreementDTO';

export default interface IEventMemberMonthlyPaymentAgreementsRepository {
  create(
    data: ICreateEventMemberMonthlyPaymentAgreementDTO,
  ): Promise<EventMemberMonthlyPaymentAgreement>;
  findById(
    event_id: string,
  ): Promise<EventMemberMonthlyPaymentAgreement | undefined>;
  findByEventMemberId(
    event_id: string,
  ): Promise<EventMemberMonthlyPaymentAgreement | undefined>;
  save(
    event: EventMemberMonthlyPaymentAgreement,
  ): Promise<EventMemberMonthlyPaymentAgreement>;
  delete(event_id: string): Promise<void>;
}
