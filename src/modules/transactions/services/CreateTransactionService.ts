import { injectable, inject } from 'tsyringe';

import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';

@injectable()
class CreateTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    category,
    amount,
    due_date,
    isPaid,
    payee_id,
    payer_id,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = await this.transactionsRepository.create({
      name,
      category,
      amount,
      due_date,
      isPaid,
      payee_id,
      payer_id,
    });

    return transaction;
  }
}

export default CreateTransactionService;
