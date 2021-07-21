import { getRepository, Repository } from 'typeorm';

import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';

import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';

class TransactionsRepository implements ITransactionsRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  public async findById(id: string): Promise<Transaction | undefined> {
    const findTransaction = await this.ormRepository.findOne(id);

    return findTransaction;
  }

  public async findByPayeeId(payee_id: string): Promise<Transaction[]> {
    const findTransactions = await this.ormRepository.find({
      where: { payee_id },
    });

    return findTransactions;
  }

  public async findByPayerId(payer_id: string): Promise<Transaction[]> {
    const findTransactions = await this.ormRepository.find({
      where: { payer_id },
    });

    return findTransactions;
  }

  public async create(data: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = this.ormRepository.create(data);

    await this.ormRepository.save(transaction);

    return transaction;
  }

  public async save(transaction: Transaction): Promise<Transaction> {
    return this.ormRepository.save(transaction);
  }

  public async delete(transaction: Transaction): Promise<void> {
    await this.ormRepository.delete(transaction.id);
  }
}

export default TransactionsRepository;
