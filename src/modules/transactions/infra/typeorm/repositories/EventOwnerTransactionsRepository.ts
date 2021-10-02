import { getRepository, Repository } from 'typeorm';

import IEventOwnerTransactionsRepository from '@modules/transactions/repositories/IEventOwnerTransactionsRepository';

import EventOwnerTransaction from '@modules/transactions/infra/typeorm/entities/EventOwnerTransaction';
import ICreateEventOwnerTransactionDTO from '@modules/transactions/dtos/ICreateEventOwnerTransactionDTO';

class EventOwnerTransactionsRepository
  implements IEventOwnerTransactionsRepository {
  private ormRepository: Repository<EventOwnerTransaction>;

  constructor() {
    this.ormRepository = getRepository(EventOwnerTransaction);
  }

  public async findById(
    id: string,
  ): Promise<EventOwnerTransaction | undefined> {
    const findEventOwnerTransaction = await this.ormRepository.findOne(id);

    return findEventOwnerTransaction;
  }

  public async findByAgreementId(
    agreement_id: string,
  ): Promise<EventOwnerTransaction[]> {
    const findEventOwnerTransactions = await this.ormRepository.find({
      where: { agreement_id },
    });

    return findEventOwnerTransactions;
  }

  public async create(
    data: ICreateEventOwnerTransactionDTO,
  ): Promise<EventOwnerTransaction> {
    const transaction = this.ormRepository.create(data);

    await this.ormRepository.save(transaction);

    return transaction;
  }

  public async save(
    transaction: EventOwnerTransaction,
  ): Promise<EventOwnerTransaction> {
    return this.ormRepository.save(transaction);
  }

  public async delete(transaction: EventOwnerTransaction): Promise<void> {
    await this.ormRepository.delete(transaction.id);
  }
}

export default EventOwnerTransactionsRepository;
