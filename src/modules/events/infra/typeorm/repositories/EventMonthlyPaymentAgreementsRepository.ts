import { getRepository, Repository } from 'typeorm';

import IEventMonthlyPaymentAgreementsRepository from '@modules/events/repositories/IEventMonthlyPaymentAgreementsRepository';

import EventMonthlyPaymentAgreement from '@modules/events/infra/typeorm/entities/EventMonthlyPaymentAgreement';
import ICreateEventMonthlyPaymentAgreementDTO from '@modules/events/dtos/ICreateEventMonthlyPaymentAgreementDTO';

class EventMonthlyPaymentAgreementssRepository
  implements IEventMonthlyPaymentAgreementsRepository {
  private ormRepository: Repository<EventMonthlyPaymentAgreement>;

  constructor() {
    this.ormRepository = getRepository(EventMonthlyPaymentAgreement);
  }

  public async findById(
    id: string,
  ): Promise<EventMonthlyPaymentAgreement | undefined> {
    const findEventMonthlyPaymentAgreement = await this.ormRepository.findOne(
      id,
    );

    return findEventMonthlyPaymentAgreement;
  }

  public async findByEventId(
    event_id: string,
  ): Promise<EventMonthlyPaymentAgreement[]> {
    const findEventMonthlyPaymentAgreement = await this.ormRepository.find({
      where: { event_id },
    });

    return findEventMonthlyPaymentAgreement;
  }

  public async create(
    data: ICreateEventMonthlyPaymentAgreementDTO,
  ): Promise<EventMonthlyPaymentAgreement> {
    const event = this.ormRepository.create(data);

    await this.ormRepository.save(event);

    return event;
  }

  public async save(
    event: EventMonthlyPaymentAgreement,
  ): Promise<EventMonthlyPaymentAgreement> {
    return this.ormRepository.save(event);
  }

  public async delete(event_id: string): Promise<void> {
    await this.ormRepository.delete(event_id);
  }
}

export default EventMonthlyPaymentAgreementssRepository;
