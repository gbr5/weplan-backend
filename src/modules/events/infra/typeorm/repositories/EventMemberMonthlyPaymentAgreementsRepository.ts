import { getRepository, Repository } from 'typeorm';

import IEventMemberMonthlyPaymentAgreementsRepository from '@modules/events/repositories/IEventMemberMonthlyPaymentAgreementsRepository';

import EventMemberMonthlyPaymentAgreement from '@modules/events/infra/typeorm/entities/EventMemberMonthlyPaymentAgreement';
import ICreateEventMemberMonthlyPaymentAgreementDTO from '@modules/events/dtos/ICreateEventMemberMonthlyPaymentAgreementDTO';

class EventMemberMonthlyPaymentAgreementssRepository
  implements IEventMemberMonthlyPaymentAgreementsRepository {
  private ormRepository: Repository<EventMemberMonthlyPaymentAgreement>;

  constructor() {
    this.ormRepository = getRepository(EventMemberMonthlyPaymentAgreement);
  }

  public async findById(
    id: string,
  ): Promise<EventMemberMonthlyPaymentAgreement | undefined> {
    const findEventMemberMonthlyPaymentAgreement = await this.ormRepository.findOne(
      id,
    );

    return findEventMemberMonthlyPaymentAgreement;
  }

  public async findByEventMemberId(
    event_id: string,
  ): Promise<EventMemberMonthlyPaymentAgreement | undefined> {
    const findEventMemberMonthlyPaymentAgreement = await this.ormRepository.findOne(
      {
        where: { event_id },
      },
    );

    return findEventMemberMonthlyPaymentAgreement;
  }

  public async create(
    data: ICreateEventMemberMonthlyPaymentAgreementDTO,
  ): Promise<EventMemberMonthlyPaymentAgreement> {
    const event = this.ormRepository.create(data);

    await this.ormRepository.save(event);

    return event;
  }

  public async save(
    event: EventMemberMonthlyPaymentAgreement,
  ): Promise<EventMemberMonthlyPaymentAgreement> {
    return this.ormRepository.save(event);
  }

  public async delete(event_id: string): Promise<void> {
    await this.ormRepository.delete(event_id);
  }
}

export default EventMemberMonthlyPaymentAgreementssRepository;
