import { getRepository, Repository } from 'typeorm';

import IEventOwnerPaymentTransactionsRepository from '@modules/transactions/repositories/IEventOwnerPaymentTransactionsRepository';

import EventOwnerPaymentTransaction from '@modules/transactions/infra/typeorm/entities/EventOwnerPaymentTransaction';
import ICreateEventOwnerPaymentTransactionDTO from '@modules/transactions/dtos/ICreateEventOwnerPaymentTransactionDTO';

class EventOwnerPaymentTransactionsRepository
  implements IEventOwnerPaymentTransactionsRepository {
  private ormRepository: Repository<EventOwnerPaymentTransaction>;

  constructor() {
    this.ormRepository = getRepository(EventOwnerPaymentTransaction);
  }

  public async findById(
    id: string,
  ): Promise<EventOwnerPaymentTransaction | undefined> {
    const findEventOwnerPaymentTransaction = await this.ormRepository.findOne({
      id,
    });

    return findEventOwnerPaymentTransaction;
  }

  public async findByOwnerPayment(
    payment_id: string,
  ): Promise<EventOwnerPaymentTransaction[]> {
    const findEventOwnerPaymentTransaction = await this.ormRepository.find({
      payment_id,
    });

    return findEventOwnerPaymentTransaction;
  }

  public async create(
    data: ICreateEventOwnerPaymentTransactionDTO,
  ): Promise<EventOwnerPaymentTransaction> {
    const checkList = await this.ormRepository.create(data);

    await this.ormRepository.save(checkList);

    return checkList;
  }

  public async save(
    checkList: EventOwnerPaymentTransaction,
  ): Promise<EventOwnerPaymentTransaction> {
    return this.ormRepository.save(checkList);
  }

  public async delete({ id }: EventOwnerPaymentTransaction): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default EventOwnerPaymentTransactionsRepository;
