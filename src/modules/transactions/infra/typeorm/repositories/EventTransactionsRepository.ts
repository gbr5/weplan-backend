import { getRepository, Repository } from 'typeorm';

import IEventTransactionsRepository from '@modules/transactions/repositories/IEventTransactionsRepository';

import EventTransaction from '@modules/transactions/infra/typeorm/entities/EventTransaction';
import ICreateEventTransactionDTO from '@modules/transactions/dtos/ICreateEventTransactionDTO';

class EventTransactionsRepository implements IEventTransactionsRepository {
  private ormRepository: Repository<EventTransaction>;

  constructor() {
    this.ormRepository = getRepository(EventTransaction);
  }

  public async findById(id: string): Promise<EventTransaction | undefined> {
    const findEventTransaction = await this.ormRepository.findOne({ id });

    return findEventTransaction;
  }

  public async findByEvent(event_id: string): Promise<EventTransaction[]> {
    const findEventTransaction = await this.ormRepository.find({ event_id });

    return findEventTransaction;
  }

  public async create(
    data: ICreateEventTransactionDTO,
  ): Promise<EventTransaction> {
    const checkList = await this.ormRepository.create(data);

    await this.ormRepository.save(checkList);

    return checkList;
  }

  public async save(checkList: EventTransaction): Promise<EventTransaction> {
    return this.ormRepository.save(checkList);
  }

  public async delete({ id }: EventTransaction): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default EventTransactionsRepository;
