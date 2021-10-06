import EventOwnerMonthlyPaymentAgreement from '@modules/events/infra/typeorm/entities/EventOwnerMonthlyPaymentAgreement';
import ICreateEventOwnerMonthlyPaymentAgreementDTO from '@modules/events/dtos/ICreateEventOwnerMonthlyPaymentAgreementDTO';

export default interface IEventOwnerMonthlyPaymentAgreementsRepository {
  create(
    data: ICreateEventOwnerMonthlyPaymentAgreementDTO,
  ): Promise<EventOwnerMonthlyPaymentAgreement>;
  findById(
    event_id: string,
  ): Promise<EventOwnerMonthlyPaymentAgreement | undefined>;
  findByEventOwnerId(
    event_id: string,
  ): Promise<EventOwnerMonthlyPaymentAgreement | undefined>;
  save(
    event: EventOwnerMonthlyPaymentAgreement,
  ): Promise<EventOwnerMonthlyPaymentAgreement>;
  delete(event_id: string): Promise<void>;
}
