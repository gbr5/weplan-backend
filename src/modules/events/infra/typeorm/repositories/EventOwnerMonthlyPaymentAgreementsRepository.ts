import { getRepository, Repository } from 'typeorm';

import IEventOwnerMonthlyPaymentAgreementsRepository from '@modules/events/repositories/IEventOwnerMonthlyPaymentAgreementsRepository';

import EventOwnerMonthlyPaymentAgreement from '@modules/events/infra/typeorm/entities/EventOwnerMonthlyPaymentAgreement';
import ICreateEventOwnerMonthlyPaymentAgreementDTO from '@modules/events/dtos/ICreateEventOwnerMonthlyPaymentAgreementDTO';

class EventOwnerMonthlyPaymentAgreementssRepository
  implements IEventOwnerMonthlyPaymentAgreementsRepository {
  private ormRepository: Repository<EventOwnerMonthlyPaymentAgreement>;

  constructor() {
    this.ormRepository = getRepository(EventOwnerMonthlyPaymentAgreement);
  }

  public async findById(
    id: string,
  ): Promise<EventOwnerMonthlyPaymentAgreement | undefined> {
    const findEventOwnerMonthlyPaymentAgreement = await this.ormRepository.findOne(
      id,
    );

    return findEventOwnerMonthlyPaymentAgreement;
  }

  public async findByEventOwnerId(
    event_id: string,
  ): Promise<EventOwnerMonthlyPaymentAgreement | undefined> {
    const findEventOwnerMonthlyPaymentAgreement = await this.ormRepository.findOne(
      {
        where: { event_id },
      },
    );

    return findEventOwnerMonthlyPaymentAgreement;
  }

  public async create(
    data: ICreateEventOwnerMonthlyPaymentAgreementDTO,
  ): Promise<EventOwnerMonthlyPaymentAgreement> {
    const event = this.ormRepository.create(data);

    await this.ormRepository.save(event);

    return event;
  }

  public async save(
    event: EventOwnerMonthlyPaymentAgreement,
  ): Promise<EventOwnerMonthlyPaymentAgreement> {
    return this.ormRepository.save(event);
  }

  public async delete(event_id: string): Promise<void> {
    await this.ormRepository.delete(event_id);
  }
}

export default EventOwnerMonthlyPaymentAgreementssRepository;
