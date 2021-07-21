import { injectable, inject } from 'tsyringe';

import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  amount: number;
  due_date: Date;
  isPaid: boolean;
}

@injectable()
class UpdateTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    amount,
    due_date,
    isPaid,
  }: IRequest): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findById(id);

    if (!transaction) throw new AppError('Transaction not found!');

    transaction.amount = amount;
    transaction.due_date = due_date;
    transaction.isPaid = isPaid;

    await this.transactionsRepository.save(transaction);

    return transaction;
  }
}

export default UpdateTransactionService;
