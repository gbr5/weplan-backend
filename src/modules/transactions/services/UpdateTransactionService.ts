import { injectable, inject } from 'tsyringe';

import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  category: string;
  amount: number;
  due_date: Date;
  isPaid: boolean;
  isCancelled: boolean;
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
    name,
    category,
    amount,
    due_date,
    isPaid,
    isCancelled,
  }: IRequest): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findById(id);

    if (!transaction) throw new AppError('Transaction not found!');

    transaction.name = name;
    transaction.category = category;
    transaction.amount = amount;
    transaction.due_date = due_date;
    transaction.isPaid = isPaid;
    transaction.isCancelled = isCancelled;

    await this.transactionsRepository.save(transaction);

    return transaction;
  }
}

export default UpdateTransactionService;
