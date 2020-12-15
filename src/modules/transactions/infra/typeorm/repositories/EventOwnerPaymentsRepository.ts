import { getRepository, Repository } from 'typeorm';

import IEventOwnerPaymentsRepository from '@modules/transactions/repositories/IEventOwnerPaymentsRepository';

import EventOwnerPayment from '@modules/transactions/infra/typeorm/entities/EventOwnerPayment';
import ICreateEventOwnerPaymentDTO from '@modules/transactions/dtos/ICreateEventOwnerPaymentDTO';

class EventOwnerPaymentsRepository implements IEventOwnerPaymentsRepository {
  private ormRepository: Repository<EventOwnerPayment>;

  constructor() {
    this.ormRepository = getRepository(EventOwnerPayment);
  }

  public async findById(id: string): Promise<EventOwnerPayment | undefined> {
    const findEventOwnerPayment = await this.ormRepository.findOne({
      id,
    });

    return findEventOwnerPayment;
  }

  public async findByEvent(event_id: string): Promise<EventOwnerPayment[]> {
    const findEventOwnerPayment = await this.ormRepository.find({
      event_id,
    });

    return findEventOwnerPayment;
  }

  public async findByOwner(
    event_owner_id: string,
  ): Promise<EventOwnerPayment[]> {
    const findEventOwnerPayment = await this.ormRepository.find({
      event_owner_id,
    });

    return findEventOwnerPayment;
  }

  public async create(
    data: ICreateEventOwnerPaymentDTO,
  ): Promise<EventOwnerPayment> {
    const checkList = await this.ormRepository.create(data);

    await this.ormRepository.save(checkList);

    return checkList;
  }

  public async save(checkList: EventOwnerPayment): Promise<EventOwnerPayment> {
    return this.ormRepository.save(checkList);
  }

  public async delete({ id }: EventOwnerPayment): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default EventOwnerPaymentsRepository;
