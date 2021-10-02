import { getRepository, Repository } from 'typeorm';

import IEventMemberTransactionsRepository from '@modules/transactions/repositories/IEventMemberTransactionsRepository';

import EventMemberTransaction from '@modules/transactions/infra/typeorm/entities/EventMemberTransaction';
import ICreateEventMemberTransactionDTO from '@modules/transactions/dtos/ICreateEventMemberTransactionDTO';

class EventMemberTransactionsRepository
  implements IEventMemberTransactionsRepository {
  private ormRepository: Repository<EventMemberTransaction>;

  constructor() {
    this.ormRepository = getRepository(EventMemberTransaction);
  }

  public async findById(
    id: string,
  ): Promise<EventMemberTransaction | undefined> {
    const findEventMemberTransaction = await this.ormRepository.findOne(id);

    return findEventMemberTransaction;
  }

  public async findByAgreementId(
    agreement_id: string,
  ): Promise<EventMemberTransaction[]> {
    const findEventMemberTransactions = await this.ormRepository.find({
      where: { agreement_id },
    });

    return findEventMemberTransactions;
  }

  public async create(
    data: ICreateEventMemberTransactionDTO,
  ): Promise<EventMemberTransaction> {
    const transaction = this.ormRepository.create(data);

    await this.ormRepository.save(transaction);

    return transaction;
  }

  public async save(
    transaction: EventMemberTransaction,
  ): Promise<EventMemberTransaction> {
    return this.ormRepository.save(transaction);
  }

  public async delete(transaction: EventMemberTransaction): Promise<void> {
    await this.ormRepository.delete(transaction.id);
  }
}

export default EventMemberTransactionsRepository;
