import { getRepository, Repository } from 'typeorm';

import IEventMemberPaymentTransactionsRepository from '@modules/transactions/repositories/IEventMemberPaymentTransactionsRepository';

import EventMemberPaymentTransaction from '@modules/transactions/infra/typeorm/entities/EventMemberPaymentTransaction';
import ICreateEventMemberPaymentTransactionDTO from '@modules/transactions/dtos/ICreateEventMemberPaymentTransactionDTO';

class EventMemberPaymentTransactionsRepository
  implements IEventMemberPaymentTransactionsRepository {
  private ormRepository: Repository<EventMemberPaymentTransaction>;

  constructor() {
    this.ormRepository = getRepository(EventMemberPaymentTransaction);
  }

  public async findById(
    id: string,
  ): Promise<EventMemberPaymentTransaction | undefined> {
    const findEventMemberPaymentTransaction = await this.ormRepository.findOne({
      id,
    });

    return findEventMemberPaymentTransaction;
  }

  public async findByMemberPayment(
    payment_id: string,
  ): Promise<EventMemberPaymentTransaction[]> {
    const findEventMemberPaymentTransaction = await this.ormRepository.find({
      payment_id,
    });

    return findEventMemberPaymentTransaction;
  }

  public async create(
    data: ICreateEventMemberPaymentTransactionDTO,
  ): Promise<EventMemberPaymentTransaction> {
    const checkList = await this.ormRepository.create(data);

    await this.ormRepository.save(checkList);

    return checkList;
  }

  public async save(
    checkList: EventMemberPaymentTransaction,
  ): Promise<EventMemberPaymentTransaction> {
    return this.ormRepository.save(checkList);
  }

  public async delete({ id }: EventMemberPaymentTransaction): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default EventMemberPaymentTransactionsRepository;
