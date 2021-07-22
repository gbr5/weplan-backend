import { getRepository, Repository } from 'typeorm';

import IEventSupplierTransactionsRepository from '@modules/transactions/repositories/IEventSupplierTransactionsRepository';

import EventSupplierTransaction from '@modules/transactions/infra/typeorm/entities/EventSupplierTransaction';
import ICreateEventSupplierTransactionDTO from '@modules/transactions/dtos/ICreateEventSupplierTransactionDTO';

class EventSupplierTransactionsRepository
  implements IEventSupplierTransactionsRepository {
  private ormRepository: Repository<EventSupplierTransaction>;

  constructor() {
    this.ormRepository = getRepository(EventSupplierTransaction);
  }

  public async findById(
    id: string,
  ): Promise<EventSupplierTransaction | undefined> {
    const findEventSupplierTransaction = await this.ormRepository.findOne(id);

    return findEventSupplierTransaction;
  }

  public async findByAgreementId(
    agreement_id: string,
  ): Promise<EventSupplierTransaction[]> {
    const findEventSupplierTransactions = await this.ormRepository.find({
      where: { agreement_id },
    });

    return findEventSupplierTransactions;
  }

  public async create(
    data: ICreateEventSupplierTransactionDTO,
  ): Promise<EventSupplierTransaction> {
    const transaction = this.ormRepository.create(data);

    await this.ormRepository.save(transaction);

    return transaction;
  }

  public async save(
    transaction: EventSupplierTransaction,
  ): Promise<EventSupplierTransaction> {
    return this.ormRepository.save(transaction);
  }

  public async delete(transaction: EventSupplierTransaction): Promise<void> {
    await this.ormRepository.delete(transaction.id);
  }
}

export default EventSupplierTransactionsRepository;
