import { getRepository, Repository } from 'typeorm';

import IEventMemberPaymentsRepository from '@modules/transactions/repositories/IEventMemberPaymentsRepository';

import EventMemberPayment from '@modules/transactions/infra/typeorm/entities/EventMemberPayment';
import ICreateEventMemberPaymentDTO from '@modules/transactions/dtos/ICreateEventMemberPaymentDTO';

class EventMemberPaymentsRepository implements IEventMemberPaymentsRepository {
  private ormRepository: Repository<EventMemberPayment>;

  constructor() {
    this.ormRepository = getRepository(EventMemberPayment);
  }

  public async findById(id: string): Promise<EventMemberPayment | undefined> {
    const findEventMemberPayment = await this.ormRepository.findOne({
      id,
    });

    return findEventMemberPayment;
  }

  public async findByEvent(event_id: string): Promise<EventMemberPayment[]> {
    const findEventMemberPayment = await this.ormRepository.find({
      event_id,
    });

    return findEventMemberPayment;
  }

  public async findByMember(
    event_member_id: string,
  ): Promise<EventMemberPayment[]> {
    const findEventMemberPayment = await this.ormRepository.find({
      event_member_id,
    });

    return findEventMemberPayment;
  }

  public async create(
    data: ICreateEventMemberPaymentDTO,
  ): Promise<EventMemberPayment> {
    const checkList = await this.ormRepository.create(data);

    await this.ormRepository.save(checkList);

    return checkList;
  }

  public async save(
    checkList: EventMemberPayment,
  ): Promise<EventMemberPayment> {
    return this.ormRepository.save(checkList);
  }

  public async delete({ id }: EventMemberPayment): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default EventMemberPaymentsRepository;
