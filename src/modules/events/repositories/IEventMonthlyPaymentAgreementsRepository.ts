import EventMonthlyPaymentAgreement from '@modules/events/infra/typeorm/entities/EventMonthlyPaymentAgreement';
import ICreateEventMonthlyPaymentAgreementDTO from '@modules/events/dtos/ICreateEventMonthlyPaymentAgreementDTO';

export default interface IEventMonthlyPaymentAgreementsRepository {
  create(
    data: ICreateEventMonthlyPaymentAgreementDTO,
  ): Promise<EventMonthlyPaymentAgreement>;
  findById(event_id: string): Promise<EventMonthlyPaymentAgreement | undefined>;
  findByEventId(event_id: string): Promise<EventMonthlyPaymentAgreement[]>;
  save(
    event: EventMonthlyPaymentAgreement,
  ): Promise<EventMonthlyPaymentAgreement>;
  delete(event_id: string): Promise<void>;
}
